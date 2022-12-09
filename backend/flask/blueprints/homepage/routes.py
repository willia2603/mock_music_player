from flask import Blueprint, render_template, abort
from jinja2.exceptions import TemplateNotFound
from database.database import engine
from sqlalchemy.orm import Session
import interfaces.album as album
import interfaces.artist as artist

home_page = Blueprint('homepage_page', __name__, template_folder='./templates/homepage')

@home_page.get('/')
def homepage():
    try:
        with Session(engine) as session:
            albums = album.get_top_n(5, session)
            artists = artist.get_top_n(3, session)
        name1 = f"Top {len(albums)} Albums"
        name2 = f"Top {len(albums)} Artists"
        
        context = {
            'title': 'Homepage',
            'albums': albums,
            'artists': artists,
            'name1': name1,
            'name2':name2
        }
        return render_template('homepage.html', **context)
    except TemplateNotFound:
        print('error')
        abort(404)