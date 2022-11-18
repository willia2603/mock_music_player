from distutils.log import debug
from flask import Flask
from albums.albums import album_page
from artists.artists import artist_page
from tracks.tracks import track_page
from test.test import test
from homepage.homepage import home_page
from search_bar.search_bar import search_page
from static.static import static_page


# ** __name__ -> name of the current Python module -> variable __name__ is used to tell where application is located. This is required to set some paths used by Flask applications. Here init app -> pass __name__ top id app and know in which package to look for resources
app = Flask(__name__)

app.register_blueprint(home_page)
app.register_blueprint(artist_page)
app.register_blueprint(album_page)
app.register_blueprint(search_page)
app.register_blueprint(track_page)
app.register_blueprint(static_page)
app.register_blueprint(test)


# add this to only run python3 app.py instead of flask run
# if __name__ == '__main__':
#     app.run(host="localhost", port=5000, debug=True)
