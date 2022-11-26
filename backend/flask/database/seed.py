from models.album import Album
from models.artist import Artist
from models.track import Track
from models.association_tables import album_artist_association, track_artist_association
from database.database import engine
import datetime
from sqlalchemy.orm import Session


# This file's purpose is to empty the db, create a set of model instances and add them to the corresponding tables

def delete_all(session):
    """
    Deletes all the rows in all the tables

    :param session: the SQLAlchemy session object that we create in main
    """
    session.query(Album).delete()
    session.query(Artist).delete()
    session.query(Track).delete()
    session.query(album_artist_association).delete()
    session.query(track_artist_association).delete()


def populate_db(session):
    """
    It creates a bunch of objects and adds them to the database

    :param session: the SQLAlchemy session object that we created in the previous step
    """
    track1 = Track(
        name="OK Overture",
        duration=22,
        file="./static/music/01. OK Overture.mp3",
        popularity=2
    )
    track2 = Track(
        name="02. Bummerland",
        duration=22,
        file="./static/music/02. Bummerland.mp3",
        popularity=1
    )

    # Muse tracks
    track3 = Track(
        name="Will Of The People",
        duration=22,
        file="./static/music/01. Will Of The People.mp3",
        popularity=1
    )
    track4 = Track(
        name="Won't Stand Down",
        duration=22,
        file="./static/music/04. Won't Stand Down.mp3",
        popularity=2
    )

    # Muse and AJR tracks
    track5 = Track(
        name="AJR-Muse 1 Track",
        duration=22,
        file="./static/music/AJR-Muse1.txt",
        popularity=1
    )
    
    track6 = Track(
        name="AJR-Muse 2 Track",
        duration=32,
        file="./static/music/AJR-Muse2.txt",
        popularity=2
    )
    # AJR and Muse album
    album1 = Album(
        name="AJR and Muse Album 1",
        year=2021,
        popularity=2,
        img_cover="./static/images/ajr_muse_cover1.jpeg",
        tracks=[track5, track6],
    )

    # AJR album
    album2 = Album(
        name="OK Orchestra",
        year=2021,
        popularity=1,
        img_cover="./static/images/ajr_cover.jpeg",
        tracks=[track1, track2],


    )
    # Muse album
    album3 = Album(
        name="Will Of The People",
        year=2021,
        popularity=1,
        img_cover="./static/images/muse_cover.jpeg",
        tracks=[track3, track4]
    )

    # AJR
    artist1 = Artist(
        name="AJR",
        surname="Artist Surname",
        birthDate=datetime.date.today(),
        popularity=1,
        albums=[album1, album2],
        tracks=[track1, track2, track5, track6]
    )

    # Muse
    artist2 = Artist(
        name="Muse",
        surname="Muse",
        birthDate=datetime.date.today(),
        popularity=2,
        albums=[album1, album3],
        # tracks=[track3, track4, track5, track6]
    )
    
    # Muse album 
    album4 = Album(
        name="Origin Of Symmetry",
        year=2016,
        popularity=1,
        img_cover="./static/images/album_placeholder.jpeg",
        artists=[artist2]
    )
    
    # AJR Muse ALbum 2
    album5 = Album(
        name="AJR and Muse Album 2",
        year=2016,
        popularity=3,
        img_cover="./static/images/album_placeholder.jpeg",
        artists=[artist1, artist2]
    )
    
    #  The Score artist
    artist3 = Artist(
        name="The Score",
        surname="The Score",
        birthDate=datetime.date.today(),
        popularity=2,
        # tracks=[track8, track9]
    )
    
    # The Score Track
    track8 = Track(
        name="08 - Revolution.mp3",
        duration=33,
        file="./static/music/08 - Revolution.mp3",
        popularity=1,
        # albums=[album6],
        artists= [artist3]
    )
    
    # The Score album
    album6 = Album(
        name="ATLAS",
        year=2017,
        popularity=1,
        img_cover="./static/images/thescore_cover.jpeg",
        tracks=[track8],
        artists=[artist3]
    )
    
     # The Score track
    track9 = Track(
        name="06 - Unstoppable.mp3",
        duration=12,
        file= "./static/music/06 - Unstoppable.mp3",
        popularity=1,
        album=album6   
    )
    
    track10 = Track(
        name="02 - Legend.mp3",
        duration=12,
        file= "./static/music/06 - 02 - Legend.mp3",
        popularity=1,
        album=album6,
        artists=[artist3]
        
    )

    session.add_all(
        [artist1, artist2, artist3,
         album1, album2, album3, album4, album5, album6,
         track1, track2, track3, track4, track5, track6, track8, track9, track10])


with Session(engine) as session:
    delete_all(session)
    populate_db(session)
    session.commit()
