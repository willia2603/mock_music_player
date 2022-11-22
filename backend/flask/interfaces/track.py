
from models.track import Track
from models.artist import Artist
from models.album import Album
from sqlalchemy.orm import Session
from schemas.track import TrackSchemaFull  
from typing import List
from sqlalchemy import or_


'''
get the top “n” track ordered by popularity
'''
def get_top_n(n : int, session : Session) -> List[TrackSchemaFull]:
    # can't access res outside of session -> need to convert res to object -> use pydantic schemas
    res = session.query(Track).order_by(Track.popularity).slice(1,n+1)
    tracks = [TrackSchemaFull.from_orm(x) for x in res]

    return tracks

'''
get all the tracks
'''
def get_all(session : Session) -> List[TrackSchemaFull]:
    res = session.query(Track).all()
    tracks = [TrackSchemaFull.from_orm(x)for x in res]
    
    return tracks
    
'''
get all tracks which contain a given word in name or file path
'''
def get_match(word : str, session : Session) -> List[TrackSchemaFull]:
    res = session.query(Track).filter(or_(Track.name.like(f'%{word}%'), Track.file.like(f'%{word}%')))
    tracks = [TrackSchemaFull.from_orm(x) for x in res]
    return tracks
        

# for future reference
# print(ArtistSchema(
#     name=2
# ))

# o = {
#     'name': 'casa',
#     'test': 2
# }
# can check futur user input by passing dict of client to schema
# print(ArtistSchema(**o))
# above comes from:
# def sum(*param1, **param2):
#     print(param1, param2)
    
# sum(*[1,2,3], **{'ciao': 'casa', 'cavolo': 'arancione'})
# sum(1,2,3, ciao='casa', cavolo='arancione')
    
    