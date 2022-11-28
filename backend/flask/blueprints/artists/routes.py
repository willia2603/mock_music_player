from flask import Blueprint, render_template, abort
from jinja2.exceptions import TemplateNotFound
from sqlalchemy.orm import Session
from database.database import engine
import interfaces.artist as artist

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