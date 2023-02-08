from sqlalchemy import Column, ForeignKey, Integer, Table, String, Date
from sqlalchemy.orm import relationship
from database.database import Base
from models.association_tables import album_artist_association

"""
SQLAlchemy Album model. 
Each album can have one or more authors.
Each album can contain one or more tracks.
"""
class Album(Base):

    __tablename__ = "album"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(64), nullable=False)
    year = Column(Integer, nullable=False)
    popularity = Column(Integer, nullable=False)
    img_cover= Column(String(64))

    # * one-to-many bidirectional relationship between album and track (-> track can be in one album)
    tracks = relationship("Track", back_populates="album")

    # * many-to-many bidirectional relationship between album and artist
    artists = relationship(
        "Artist", secondary=album_artist_association, back_populates="albums")

    def __repr__(self):

        return f"Album(id={self.id!r}, name={self.name!r}, year={self.year!r})"

from models.artist import Artist
