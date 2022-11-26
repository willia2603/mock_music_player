from pydantic import BaseModel
from typing import List

"""
Schema used to convert a track (returned by a query to the db) to a python object
"""
class TrackSchemaBase(BaseModel):
    id: int
    name: str
    duration: int
    file: str
    popularity: int
    album_id: int
    
    class Config:
        orm_mode = True
        
class TrackSchemaFull(TrackSchemaBase):
    artists: List["ArtistSchemaBase"]
    album: "AlbumSchemaBase"
    

from schemas.album import AlbumSchemaBase
from schemas.artist import ArtistSchemaBase
TrackSchemaBase.update_forward_refs()
TrackSchemaFull.update_forward_refs()
