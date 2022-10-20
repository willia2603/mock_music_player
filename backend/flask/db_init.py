from database import Base, engine
from models.artist import Artist
from models.album import Album
from models.track import Track

from sqlalchemy.orm import Session
import datetime

# Metadata: contains schemas, need to create (empty) tables before inserting rows
Base.metadata.create_all(engine)


def populate_db(session):
    # AJR tracks
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

    session.add_all(
        [artist1, artist2,
         album1, album2, album3,
         track1, track2, track3, track4, track5, track6])
    session.commit()


with Session(engine) as session:
    populate_db(session)
