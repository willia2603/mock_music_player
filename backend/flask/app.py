from flask import Flask
from routes.frontend.frontend import home_page, artist_page, album_page, search_page, track_page, static_page
# ** __name__ -> name of the current Python module -> variable __name__ is used to tell where application is located. This is required to set some paths used by Flask applications. Here init app -> pass __name__ top id app and know in which package to look for resources
app = Flask(__name__)

app.register_blueprint(home_page)
app.register_blueprint(artist_page)
app.register_blueprint(album_page)
app.register_blueprint(search_page)
app.register_blueprint(track_page)
app.register_blueprint(static_page)
    
    
    
    
    
    
# add this to only run python3 app.py instead of flask run
# if __name__ == '__main__':
#     app.run(host="localhost", port=5000, debug=True)