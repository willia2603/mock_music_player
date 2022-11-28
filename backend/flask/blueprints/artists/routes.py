from flask import Blueprint, render_template, abort
from jinja2.exceptions import TemplateNotFound

artist_page = Blueprint('artists_page', __name__,
                        template_folder='./templates/artists')
                        
                        
@artist_page.route('/artist')
def artists():
    try:
        return render_template('artists.html')
    except TemplateNotFound:
        print('error')
        abort(404)