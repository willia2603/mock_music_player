from flask import Blueprint, render_template, abort
from jinja2.exceptions import TemplateNotFound


search_page = Blueprint('search_page', __name__,
                        template_folder='./templates/search_bar')
                        
@search_page.route('/search')
def search():
    try:
        return render_template('search.html')
    except TemplateNotFound:
        print('error')
        abort(404)
