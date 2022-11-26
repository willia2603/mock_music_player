from models.album import Album
from models.artist import Artist
from models.track import Track
from models.association_tables import album_artist_association
from schemas.artist import ArtistSchemaFull
from schemas.album import AlbumSchemaFull
from schemas.track import TrackSchemaFull
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import and_
from sqlalchemy import or_
from sqlalchemy.orm import aliased



def get_top_n(n : int, session: Session) -> List[ArtistSchemaFull]:
    """
    > Get the top n artists from the database, ordered by popularity

    :param n: the number of artists to return
    :type n: int
    :param session: the SQLAlchemy session object
    :type session: Session
    :return: A list of ArtistSchemaFull objects
    """
    res = session.query(Artist).order_by(Artist.popularity).slice(1, n+1)
    artists = [ArtistSchemaFull.from_orm(x) for x in res]
    return artists


def get_all(session: Session) -> List[ArtistSchemaFull]:
    """
    > Get all artists from the database and return them as a list of `ArtistSchemaFull` objects

    :param session: the SQLAlchemy session object
    :type session: Session
    :return: A list of ArtistSchemaFull objects
    """
    res = session.query(Artist).all()
    artists = [ArtistSchemaFull.from_orm(x) for x in res]
    return artists
    

def get_common_albums(artist_ids : List[int], session: Session) -> List[AlbumSchemaFull]:
    """
    > Given a list of artist ids, return a list of albums that are associated with all of the artists

    :param artist_ids: a list of artist ids
    :type artist_ids: List[int]
    :param session: the SQLAlchemy session object
    :type session: Session
    :return: A list of AlbumSchemaFull objects
    """

    # 
    # aa1 = aliased(album_artist_association)
    # aa2 = aliased(album_artist_association)
    # res = session.query(aa1).join(aa2, aa1.columns.album_id == aa2.columns.album_id)
    # print(res)
    aliases = []
    for el in artist_ids:
        aliases.append(aliased(album_artist_association))
        
    res = session.query(Album)
    
    for i in range(len(aliases)):
        res = res.join(aliases[i], Album.id == aliases[i].columns.album_id)
    
    conds = []
    
    for i in range(len(artist_ids)):
        conds.append(aliases[i].columns.artist_id == artist_ids[i])
    res = res.where(and_(*conds))
    albums = [AlbumSchemaFull.from_orm(x) for x in res]
    return albums


def get_common_tracks(artist_ids : List[int], session: Session) -> List[TrackSchemaFull]:
    """
    > Get all the tracks that are common to all the given artists
    
    :param artist_ids: a list of artist ids
    :type artist_ids: List[int]
    :param session: the SQLAlchemy session object
    :type session: Session
    :return: A list of TrackSchemaFull objects
    """
    albums = get_common_albums(artist_ids, session)
    tracks = [track for album in albums for track in album.tracks]
    return tracks

def get_match(word : str, session: Session) -> List[ArtistSchemaFull]:
    """
    Given a word and a session, return a list of artists whose name or surname contains the word
    
    :param word: the word to search for
    :type word: str
    :param session: the SQLAlchemy session object
    :type session: Session
    :return: A list of ArtistSchemaFull objects
    """
    res = session.query(Artist).filter(or_(Artist.name.like(f"%{word}%"), Artist.surname.like(f"%{word}%")))
    artists = [ArtistSchemaFull.from_orm(x) for x in res]
    return artists
    