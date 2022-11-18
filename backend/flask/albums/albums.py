from flask import Blueprint, render_template, abort, url_for
from jinja2.exceptions import TemplateNotFound

# A Blueprint is a way to organize a group of related views and other code.
album_page = Blueprint('album_page', __name__,
                       template_folder='./templates/albums')
                       
@album_page.route('/album')
def albums():
    try:
        print(url_for('album_page.albums'))
        return render_template('albums.html')
    except TemplateNotFound:
        print('error')
        abort(404)
