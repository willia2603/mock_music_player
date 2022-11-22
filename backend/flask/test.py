from interfaces import album
from database.database import engine
from sqlalchemy.orm import Session

with Session(engine) as session:
    print(len(album.get_top_n(3, session)))
    print()
    print(len(album.get_all(session)))
    print()
    print(album.get_match("ill", session))
    print()
    print(album.get_tracks(1, session))