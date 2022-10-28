from database import engine
from sqlalchemy.orm import Session
from sqlalchemy import select
from models.album import Album
from models.artist import Artist
from models.track import Track
from models.association_tables import album_artist_association, track_artist_association

with Session(engine) as session:
    # res = session.execute(select(Track)).first() # These two are equivalent
    res = session.query(Track).first()
    print(res)
