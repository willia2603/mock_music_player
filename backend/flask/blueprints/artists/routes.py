from flask import Blueprint, render_template, abort
from jinja2.exceptions import TemplateNotFound
from sqlalchemy.orm import Session
from database.database import engine
import interfaces.artist as artist
import interfaces.album as album

artist_page = Blueprint('artists_page', __name__,
                        template_folder='./templates/artists')
                        
                        
@artist_page.route('/artist')
def artists():
    try:
        with Session(engine) as session:
            artists = artist.get_all(session)
        context = {
            'title': 'Artists',
            'artists': artists
        }
        return render_template('artists.html', **context)
    except TemplateNotFound:
        print('error')
        abort(404)

@artist_page.route('/artists/<int:id>/info')   
def goto_artist(id: int):
    try:
        with Session(engine) as session:
            art = artist.get_artist(id, session)[0]
        context = {
            'title': art.name,
            'artist_img': art.artist_img,
            'tracks': art.tracks,
            'albums': art.albums
        }
        return render_template('artists_info.html', **context)
    except TemplateNotFound:
        print('error')
        abort(404)
