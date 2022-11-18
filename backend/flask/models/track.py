from sqlalchemy import Column, ForeignKey, Integer, Table, String, Date
from sqlalchemy.orm import relationship
from database import Base
from models.association_tables import track_artist_association


class Track(Base):
    __tablename__ = "track"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(64))
    duration = Column(Integer)
    file = Column(String(64))
    popularity = Column(Integer)

    # * for one-to-many bidirectional relationship with album (one song can be only in one album)
    album_id = Column(Integer, ForeignKey("album.id"))
    # album = relationship("Album", back_populates="tracks")

    # * for many-to-many bidirectional relationship between track and artist
    artists = relationship(
        "Artist", secondary=track_artist_association, back_populates="tracks")

    # repr vs str: repr os a string but with more details about obj. str for costumer (simplified repr)
    def __repr__(self):
        return f"Track(id={self.id!r}, name={self.name!r}, file={self.file!r}, album_id={self.album_id}, artists={self.artists})"
