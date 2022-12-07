from flask import Blueprint, render_template, abort
from jinja2.exceptions import TemplateNotFound
import interfaces.track as track
from sqlalchemy.orm import Session
from database.database import engine

track_page = Blueprint('tracks_page', __name__,
                       template_folder='./templates/tracks')
                       
@track_page.route('/tracks')
def tracks():
    try:
        with Session(engine) as session:
            tracks = track.get_all(session)
        context = {
            'title': 'Tracks',
            'tracks': [track.dict() for track in tracks]
        }
        return render_template('tracks.html', **context)
    except TemplateNotFound:
        print('error')
        abort(404)
                       
                       