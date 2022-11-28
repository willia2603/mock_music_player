from pydantic import BaseModel
from typing import List
from datetime import date

"""
Schema used to convert an artist returned by a query to a python object
"""
class ArtistSchemaBase(BaseModel):
    id: int
    name: str
    surname: str
    birthDate: date
    popularity: int
    artist_img: str
    
    class Config:
        orm_mode = True

class ArtistSchemaFull(ArtistSchemaBase):    
    albums: List["AlbumSchemaBase"]
    tracks: List["TrackSchemaBase"]

# import here to avoid circular import 
from schemas.album import AlbumSchemaBase
from schemas.track import TrackSchemaBase
ArtistSchemaBase.update_forward_refs()
ArtistSchemaFull.update_forward_refs()
