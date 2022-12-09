from flask import Blueprint, render_template, abort
from jinja2.exceptions import TemplateNotFound
from sqlalchemy.orm import Session
from database.database import engine
import interfaces.album as album
import interfaces.artist as artist
import interfaces.track as track
from flask import request

search_page = Blueprint('search_page', __name__,
                        template_folder='./templates/search_bar')
                        
@search_page.get('/search')
def search():
    try:
        word = request.args.getlist('q')[0]
        with Session(engine) as session:
            albums= album.get_match(word, session)
            tracks = track.get_match(word, session)
            artists = artist.get_match(word, session)
            
        context = {
            'title': 'Search Results',
            'tracks': [track.dict() for track in tracks],
            'albums': albums,
            'artists': artists
        }

        return render_template('search.html', **context)
    except TemplateNotFound:
        print('error')
        abort(404)
