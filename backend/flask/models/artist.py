from sqlalchemy import Column, ForeignKey, Integer, Table, String, Date
from sqlalchemy.orm import relationship
from database.database import Base
from models.association_tables import album_artist_association, track_artist_association

"""
SQLAlchemy Artist model. 
Each artist can compose one or more albums.
Each artist can compose one or more tracks.
"""
class Artist(Base):
    __tablename__ = "artist"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(64), nullable=False)
    surname = Column(String(64), nullable=False)
    birthDate = Column(Date, nullable=False)
    popularity = Column(Integer)
    artist_img = Column(String(64))

    # * many-to-many bidirectional relationship between album and artist
    albums = relationship(
        "Album", secondary=album_artist_association, back_populates="artists")

    # * for many-to-many relationship between track and artist
    tracks = relationship(
        "Track", secondary=track_artist_association, back_populates="artists")

    def __repr__(self):
        return f"Artist(id={self.id!r}, name={self.name!r}, fullname={self.surname!r})"

from models.track import Track
from models.album import Album
