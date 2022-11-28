from flask import Blueprint, render_template, abort, url_for
from jinja2.exceptions import TemplateNotFound
import interfaces.album as album
from sqlalchemy.orm import Session
from database.database import engine

# A Blueprint is a way to organize a group of related views and other code.
album_page = Blueprint('albums_page', __name__,
                       template_folder='templates/albums')
                       
@album_page.route('/albums')
def albums():
    try:
        with Session(engine) as session:
            albums = album.get_all(session)
            context = {
                'title': 'Albums',
                'albums': albums
            }
            return render_template('albums.html', **context)
    except TemplateNotFound:
        print('error')
        abort(404)
