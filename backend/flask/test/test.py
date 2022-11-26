from flask import Blueprint
from models.track import Track
from database.database import engine
from sqlalchemy.orm import Session
from utils import row2dict
from interfaces.track import get_top_n
from typing import List
from schemas.track import TrackSchemaFull


test = Blueprint('test', __name__)

@test.route("/test")
def return_first_db_track() -> Track:
    with Session(engine) as session:
        track: List[TrackSchemaFull]  = get_top_n(1, session)
    return track[0].dict()
    
