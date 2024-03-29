from sqlalchemy import Column, ForeignKey, Integer, Table, String, Date
from sqlalchemy.orm import relationship
from database.database import Base
from models.association_tables import track_artist_association

"""
SQLAlchemy Track model. 
Each track can be in one album only.
Each track can be composed by more artists
"""
class Track(Base):
    __tablename__ = "track"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(64), nullable=False)
    duration = Column(Integer, nullable=False)
    file = Column(String(64), nullable=False)
    popularity = Column(Integer, nullable=False)

    # * for one-to-many bidirectional relationship with album (one song can be only in one album)
    album_id = Column(Integer, ForeignKey("album.id"))
    album = relationship("Album", back_populates="tracks")

    # * for many-to-many bidirectional relationship between track and artist
    artists = relationship(
        'Artist', secondary=track_artist_association, back_populates="tracks")

    def __repr__(self):
        return f"Track(id={self.id!r}, name={self.name!r}, file={self.file!r}, album_id={self.album_id}, artists={self.artists}, popularity={self.popularity})"

from models.artist import Artist
