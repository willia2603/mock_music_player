from models.track import  Track
from models.album import Album
from schemas.album import AlbumSchemaBase
from schemas.track import TrackSchemaBase
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List

'''
get the top “n” by popularity
'''
def get_top_n(n: int, session: Session) -> List[AlbumSchemaBase]:
    res = session.query(Album).order_by(Album.popularity).slice(1, n+1)
    albums = [AlbumSchemaBase.from_orm(x) for x in res]
    return albums

'''
get all the albums
'''
def get_all(session: Session) -> List[AlbumSchemaBase]:
    res = session.query(Album).all()
    albums = [AlbumSchemaBase.from_orm(x) for x in res]
    return albums
    
'''
get all the tracks in a given album
'''
def get_tracks(album_id : int, session: Session) -> List[TrackSchemaBase]:
    res = session.query(Track).where(Track.album_id == album_id)
    tracks = [TrackSchemaBase.from_orm(x) for x in res]
    return tracks

# *! TODO do it for artists and tracks fields as well (also true for other models)
'''
get all albums which contain a given word in the name
'''
def get_match(word : str, session: Session) -> List[AlbumSchemaBase]:
    res = session.query(Album).filter(or_(Album.name.like(f'%{word}%')))
    albums = [AlbumSchemaBase.from_orm(x) for x in res]
    return albums


