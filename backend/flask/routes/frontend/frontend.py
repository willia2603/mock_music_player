from re import template
from flask import Blueprint, render_template, abort, url_for, send_from_directory
from jinja2 import TemplateNotFound

home_page = Blueprint('home_page', __name__, template_folder='../../frontend')
artist_page = Blueprint('artist_page', __name__, template_folder='../../frontend')
album_page = Blueprint('album_page', __name__, template_folder='../../frontend')
search_page = Blueprint('search_page', __name__, template_folder='../../frontend')
track_page = Blueprint('tracks_page', __name__, template_folder='../../frontend')

static_page = Blueprint('static_page', __name__, static_folder='static')

@home_page.route('/')
def homepage():
    try:
        return render_template('homepage.html')
    except TemplateNotFound:
        print('error')
        abort(404)
        
@album_page.route('/album')
def albums():
    try:
        print(url_for('album_page.albums'))
        return render_template('albums.html')
    except TemplateNotFound:
        print('error')
        abort(404)
        
@artist_page.route('/artist')
def artists():
    try:
        return render_template('artists.html')
    except TemplateNotFound:
        print('error')
        abort(404)
        
@search_page.route('/search')
def search():
    try:
        return render_template('search.html')
    except TemplateNotFound:
        print('error')
        abort(404)

@track_page.route('/tracks')
def tracks():
    try:
        return render_template('tracks.html')
    except TemplateNotFound:
        print('error')
        abort(404)
        
# ** You can add variable sections to a URL by marking sections with <variable_name>. 
# ** Your function then receives the <variable_name> as a keyword argument. 
# Optionally, you can use a converter to specify the type of the argument like <converter:variable_name>.
# converter types: string (with no /), int, float, path, uuid
@static_page.route("/static/<path:path>")
def static_pages(path):
    return send_from_directory("static", path)

