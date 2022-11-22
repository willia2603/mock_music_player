from flask import Blueprint
from models.track import Track
from database.database import engine
from sqlalchemy.orm import Session
from utils import row2dict


test = Blueprint('test', __name__)

@test.route("/test")
def return_first_db_track() -> Track:
    with Session(engine) as session:
        # These two are equivalent: latter one is better (safe)
        # track = session.execute(select(Track)).first()
        # *! TODO: replace with top_n in interface track.py, then return track.dict()
        track = session.query(Track).first()
        print(track.__dict__)
    return row2dict(track)
    
# *! TODOL change session to db