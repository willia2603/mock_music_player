
from models.track import Track
from models.artist import Artist
from models.album import Album
from sqlalchemy.orm import Session
from schemas.track import TrackSchemaFull  
from typing import List
from sqlalchemy import or_



def get_top_n(n : int, session : Session) -> List[TrackSchemaFull]:
    """
    > Get the top n tracks from the database, ordered by popularity

    :param n: the number of tracks you want to get
    :type n: int
    :param session: the SQLAlchemy session object 
    :type session: Session
    :return: A list of TrackSchemaFull objects
    """
    # can't access res outside of session -> need to convert res to object -> use pydantic schemas
    res = session.query(Track).order_by(Track.popularity).slice(1,n+1)
    tracks = [TrackSchemaFull.from_orm(x) for x in res]
    return tracks


def get_all(session : Session) -> List[TrackSchemaFull]:
    """
    > This function returns a list of all the tracks in the database

    :param session: The SQLAlchemy session object
    :type session: Session
    :return: A list of TrackSchemaFull objects
    """
    res = session.query(Track).all()
    tracks = [TrackSchemaFull.from_orm(x)for x in res]
    return tracks
    
def get_match(word : str, session : Session) -> List[TrackSchemaFull]:
    """
    > Get all tracks that have a name or file that contains the given word

    :param word: the word to search for
    :type word: str
    :param session: The SQLAlchemy session object
    :type session: Session
    :return: A list of TrackSchemaFull objects
    """
    res = session.query(Track).filter(or_(Track.name.like(f'%{word}%')))
    tracks = [TrackSchemaFull.from_orm(x) for x in res]
    return tracks
        
    
    