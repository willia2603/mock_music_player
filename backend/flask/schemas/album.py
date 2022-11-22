from pydantic import BaseModel
from typing import List

'''
Schema used to convert an album returned by a query to a python object
'''
class AlbumSchemaBase(BaseModel):
    id: int
    name: str
    year: int
    popularity: int
    
    class Config:
        orm_mode = True

class AlbumSchemaFull(AlbumSchemaBase):
    tracks: List["TrackSchemaBase"]
    artists: List["ArtistSchemaBase"]
        
from schemas.artist import ArtistSchemaBase
from schemas.track import TrackSchemaBase
AlbumSchemaBase.update_forward_refs()
AlbumSchemaFull.update_forward_refs()
