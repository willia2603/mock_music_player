from models.album import Album
from models.artist import Artist
from models.track import Track
from models.association_tables import album_artist_association, track_artist_association
from database.database import engine
import datetime
from sqlalchemy.orm import Session

'''
This file's purpose is to create a set of model instances and add them to the corresponding tables
'''


def delete_all(session):
    session.query(Album).delete()
    session.query(Artist).delete()
    session.query(Track).delete()
    session.query(album_artist_association).delete()
    session.query(track_artist_association).delete()


def populate_db(session):
    track1 = Track(
        name=f"OK Overture",
        duration=f"22",
        file=f"./static/music/01. OK Overture.mp3",
        popularity=2
    )
    track2 = Track(
        name=f"02. Bummerland",
        duration=f"22",
        file=f"./static/music/02. Bummerland.mp3",
        popularity=1
    )

    # Muse tracks
    track3 = Track(
        name=f"Will Of The People",
        duration=f"22",
        file=f"./static/music/01. Will Of The People.mp3",
        popularity=1
    )
    track4 = Track(
        name=f"Won't Stand Down",
        duration=f"22",
        file=f"./static/music/04. Won't Stand Down.mp3",
        popularity=2
    )

    # Muse and AJR tracks
    track5 = Track(
        name=f"AJR-Muse1",
        duration=f"22",
        file=f"./BAH1",
        popularity=1
    )
    track6 = Track(
        name=f"AJR-Muse2",
        duration=f"32",
        file=f"./BAH2",
        popularity=2
    )
    # AJR and Muse album
    album1 = Album(
        name=f"AJR and Muse",
        year=int(f"2022"),
        popularity=2,
        tracks=[track5, track6],
    )

    # AJR album
    album2 = Album(
        name=f"OK Orchestra",
        year=int(f"2021"),
        popularity=1,
        tracks=[track1, track2],


    )
    # Muse album
    album3 = Album(
        name=f"Will Of The People",
        year=int(f"2022"),
        popularity=1,
        tracks=[track3, track4]
    )

    # AJR
    artist1 = Artist(
        name=f"AJR",
        surname=f"Artist Surname",
        birthDate=datetime.date.today(),
        popularity=1,
        albums=[album1, album2],
        tracks=[track1, track2, track5, track6]
    )

    # Muse
    artist2 = Artist(
        name=f"Muse",
        surname=f"Muse",
        birthDate=datetime.date.today(),
        popularity=2,
        albums=[album1, album3],
        tracks=[track3, track4, track5, track6]
    )

    album4 = Album(
        name=f"Origin Of Symmetry",
        year=int(f"2016"),
        popularity=1,
        artists=[artist2]
    )

    track7 = Track(
        name=f"AJR-Muse2",
        duration=f"56",
        file=f"./BAH3",
        popularity=1,
        artists=[artist1, artist2]
    )

    album5 = Album(
        name=f"AJR-MUSE-ALBUM",
        year=int(f"2016"),
        popularity=1,
        artists=[artist1, artist2]
    )

    album6 = Album(
        name=f"AJR-MUSE-ALBUM-NOARTIST-TRACKWITHARTIST",
        year=int(f"2016"),
        popularity=1,
        tracks=[track7]
    )
    session.add_all(
        [artist1, artist2,
         album1, album2, album3, album4, album5, album6,
         track1, track2, track3, track4, track5, track6])


with Session(engine) as session:
    delete_all(session)
    populate_db(session)
    session.commit()
