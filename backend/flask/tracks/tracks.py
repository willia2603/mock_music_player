from flask import Blueprint, render_template, abort
from jinja2.exceptions import TemplateNotFound

track_page = Blueprint('tracks_page', __name__,
                       template_folder='./templates/tracks')
                       
@track_page.route('/tracks')
def tracks():
    try:
        return render_template('tracks.html')
    except TemplateNotFound:
        print('error')
        abort(404)
                       
                       