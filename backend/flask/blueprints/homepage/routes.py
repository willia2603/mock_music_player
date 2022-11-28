from flask import Blueprint, render_template, abort
from jinja2.exceptions import TemplateNotFound
from database.database import engine
from sqlalchemy.orm import Session
import interfaces.album as album
import interfaces.artist as artist

home_page = Blueprint('homepage_page', __name__, template_folder='./templates/homepage')

@home_page.route('/')
def homepage():
    try:
        with Session(engine) as session:
            albums = album.get_top_n(3, session)
            artists = artist.get_top_n(3, session)
            context = {
                'title': 'homepage',
                'size': len(albums),
                'albums': albums,
                'artists': artists
            }
            print(len(artists))
            return render_template('homepage.html', **context)
    except TemplateNotFound:
        print('error')
        abort(404)