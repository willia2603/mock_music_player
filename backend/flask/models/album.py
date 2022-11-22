from sqlalchemy import Column, ForeignKey, Integer, Table, String, Date
from sqlalchemy.orm import relationship
from database.database import Base
from models.association_tables import album_artist_association

# bidirectional relationship: da album posso arrivare a track e da track posso arrivare ad album
'''
SQLAlchemy Album model. 
Each album can have one or more authors.
Each album can contain one or more tracks.
'''

class Album(Base):

    __tablename__ = "album"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(64))
    year = Column(Integer)
    popularity = Column(Integer)

    # * one-to-many bidirectional relationship between album and track (-> track can be in one album)
    tracks = relationship("Track", back_populates="album")
    # tracks = relationship("Track", backref="album")

    # * many-to-many bidirectional relationship between album and artist
    artists = relationship(
        "Artist", secondary=album_artist_association, back_populates="albums")

    # repr vs str: repr os a string but with more details about obj. str for costumer (simplified repr)
    def __repr__(self):

        return f"Album(id={self.id!r}, name={self.name!r}, year={self.year!r})"

from models.artist import Artist
