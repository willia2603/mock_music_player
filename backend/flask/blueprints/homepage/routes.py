from flask import Blueprint, render_template, abort
from jinja2.exceptions import TemplateNotFound

home_page = Blueprint('home_page', __name__, template_folder='./templates/homepage')

@home_page.route('/')
def homepage():
    try:
        return render_template('homepage.html')
    except TemplateNotFound:
        print('error')
        abort(404)