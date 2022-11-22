from sqlalchemy import Column, ForeignKey, Integer, Table, String, Date
from sqlalchemy.orm import relationship
from database.database import Base
from models.association_tables import album_artist_association, track_artist_association

'''
SQLAlchemy Artist model. 
Each artist can compose one or more albums.
Each artist can compose one or more tracks.
'''
class Artist(Base):
    __tablename__ = "artist"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(64))
    surname = Column(String(64))
    birthDate = Column(Date)
    popularity = Column(Integer)

    # * many-to-many bidirectional relationship between album and artist
    albums = relationship(
        "Album", secondary=album_artist_association, back_populates="artists")

    # * for many-to-many relationship between track and artist
    tracks = relationship(
        "Track", secondary=track_artist_association, back_populates="artists")

    # repr vs str: repr os a string but with more details about obj. str for costumer (simplified repr)
    def __repr__(self):
        return f"Artist(id={self.id!r}, name={self.name!r}, fullname={self.surname!r})"

from models.track import Track
from models.album import Album
