from flask import Blueprint, send_from_directory



static_page = Blueprint('static_page', __name__, static_folder='static')

# ** You can add variable sections to a URL by marking sections with <variable_name>.
# ** Your function then receives the <variable_name> as a keyword argument.
# Optionally, you can use a converter to specify the type of the argument like <converter:variable_name>.
# converter types: string, int, float, path, uuid
@static_page.route("/static/<path:path>")
def static_pages(path : str):
    return send_from_directory("static", path)