from pydantic import BaseModel, validator
from typing import List
from datetime import date
import datetime

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
    
    @validator("birthDate")
    def date_to_str(cls, v):
        if isinstance(v, date):
            return v.strftime("%m/%d/%Y")
        
    
    class Config:
        orm_mode = True

class ArtistSchemaFull(ArtistSchemaBase):    
    albums: List["AlbumSchemaBase"]   
    tracks: List["TrackSchemaFull"]
 
    
    

# import here to avoid circular import 
from schemas.album import AlbumSchemaBase
from schemas.track import TrackSchemaFull
ArtistSchemaBase.update_forward_refs()
ArtistSchemaFull.update_forward_refs()

