from interfaces import track
from database.database import engine
from sqlalchemy.orm import Session

with Session(engine) as session:
    print(len(track.get_top_n(3, session)))
    print()
    print(len(track.get_all(session)))
    print('getmatch')
    print(len(track.get_match("ill", session)))
