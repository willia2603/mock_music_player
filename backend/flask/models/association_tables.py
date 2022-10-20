from sqlalchemy import Column, ForeignKey, Integer, Table, String, Date
from database import Base

# * for many-to-many relationship between album and artist
album_artist_association = Table(
    "album_artist_association",
    Base.metadata,
    Column("artist_id", ForeignKey("artist.id")),
    Column("album_id", ForeignKey("album.id"))
)

# * for many-to-many relationship between track and artist
track_artist_association = Table(
    "track_artist_association",
    Base.metadata,
    Column("artist_id", ForeignKey("artist.id")),
    Column("track_id", ForeignKey("track.id"))
)
