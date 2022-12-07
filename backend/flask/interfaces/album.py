from models.track import  Track
from models.album import Album
from schemas.album import AlbumSchemaFull
from schemas.track import TrackSchemaFull
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List


def get_top_n(n: int, session: Session) -> List[AlbumSchemaFull]:
    """
    > Get the top n albums from the database, and return them as a list of AlbumSchemaFull objects

    :param n: the number of albums you want to get
    :type n: int
    :param session: the SQLAlchemy session object
    :type session: Session
    :return: A list of AlbumSchemaFull objects
    """
    res = session.query(Album).order_by(Album.popularity).limit(n)
    albums = [AlbumSchemaFull.from_orm(x) for x in res]
    return albums

def get_all(session: Session) -> List[AlbumSchemaFull]:
    """
    > Get all albums from the database

    :param session: the SQLAlchemy session object
    :type session: Session
    :return: A list of AlbumSchemaFull objects
    """
    res = session.query(Album).all()
    albums = [AlbumSchemaFull.from_orm(x) for x in res]
    return albums
    
def get_tracks(album_id : int, session: Session) -> List[TrackSchemaFull]:
    """
    > Get all tracks for a given album

    :param album_id: The ID of the album you want to get the tracks for
    :type album_id: int
    :param session: The SQLAlchemy session object
    :type session: Session
    :return: A list of TrackSchemaFull objects
    """
    res = session.query(Track).where(Track.album_id == album_id)
    tracks = [TrackSchemaFull.from_orm(x) for x in res]
    return tracks

def get_match(word : str, session: Session) -> List[AlbumSchemaFull]:
    """
    > This function takes a word and a session, and returns a list of albums whose name contains the
    word

    :param word: the word to search for
    :type word: str
    :param session: The SQLAlchemy session object
    :type session: Session
    :return: A list of AlbumSchemaFull objects
    """
    res = session.query(Album).filter(or_(Album.name.like(f'%{word}%')))
    albums = [AlbumSchemaFull.from_orm(x) for x in res]
    return albums


