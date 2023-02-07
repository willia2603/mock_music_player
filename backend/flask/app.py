from flask import Flask, send_from_directory
from blueprints.albums.routes import album_page
from blueprints.artists.routes import artist_page
from blueprints.tracks.routes import track_page
from blueprints.homepage.routes import home_page
from blueprints.search_bar.routes import search_page
from database.database import engine
from sqlalchemy.orm import Session
from interfaces.track import get_top_n
from typing import List
from schemas.track import TrackSchemaFull
from api.v1.routes import api
from flask_cors import CORS



# ** __name__ -> name of the current Python module -> variable __name__ is used to tell where application is located. This is required to set some paths used by Flask applications. Here init app -> pass __name__ top id app and know in which package to look for resources
app = Flask(__name__, template_folder='templates/jinja2')

# To avoid CORS error
# origins -> define which pages can make request (make it safe)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])
app.config['CORS_HEADERS'] = 'Content-Type'

# ** You can add variable sections to a URL by marking sections with <variable_name>.
# ** Your function then receives the <variable_name> as a keyword argument.
# Optionally, you can use a converter to specify the type of the argument like <converter:variable_name>.
# converter types: string, int, float, path, uuid
@app.get("/static/<path:path>")
def static_pages(path : str):
    return send_from_directory("static", path)

@app.get("/test")
def return_first_db_track() -> TrackSchemaFull:
    with Session(engine) as session:
        track: List[TrackSchemaFull]  = get_top_n(1, session)
    return track[0].dict()

app.register_blueprint(home_page)
app.register_blueprint(artist_page)
app.register_blueprint(album_page)
app.register_blueprint(search_page)
app.register_blueprint(track_page)
app.register_blueprint(api, url_prefix='/api/v1')

# TODO add react route and vue route /react/*

# add this to only run python3 app.py instead of flask run
# if __name__ == '__main__':
#     app.run(host="localhost", port=5000, debug=True)
