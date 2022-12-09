from flask import Blueprint
import interfaces.album as album
from sqlalchemy.orm import Session
from database.database import engine
import json
import interfaces.track as track
import interfaces.artist as artist
from flask import request

'''
This API is used to interact more easily with Vue and React. Else it would not be needed.
'''

api = Blueprint('api', __name__)

# OK
@api.get('/tracks')
def get_all_tracks():
    with Session(engine) as session:
        tracks = track.get_all(session)
    context = {
            'title': 'Tracks',
            'tracks': [track.dict() for track in tracks]
        }
    return context
    
# OK
@api.get('/albums')
def get_all_albums():
    with Session(engine) as session:
            albums = album.get_all(session)
    albums = [album.dict() for album in albums]
    context = {
            'title': 'Albums',
            'albums': albums
        }
    return context
    
# OK
@api.get('/album_tracks/<int:id>')
def get_album_info(id : int):
    with Session(engine) as session:
        tracks = album.get_tracks(id, session)
    album_name = tracks[0].album.name
    album_cover = tracks[0].album.img_cover
    context = {
            'title': album_name,
            'album_name': album_name,
            'album_cover':album_cover,
            'tracks': [track.dict() for track in tracks]
        }
    return context

# OK
@api.get('/artists/<int:id>')
def get_artist_info(id: int):
    
    with Session(engine) as session:
        art = artist.get_artist(id, session)[0]
    context = {
            'title': art.name,
            'artist_img': art.artist_img,
            'tracks': [track.dict() for track in art.tracks],
            'albums': [album.dict() for album in art.albums]
    }
    return context
    
# OK
@api.get('/search')
def get_match():
    word = request.args.getlist('q')[0]
    with Session(engine) as session:
        albums= album.get_match(word, session)
        tracks = track.get_match(word, session)
        artists = artist.get_match(word, session)
        
    context = {
        'title': 'Search Results',
        'tracks': [track.dict() for track in tracks],
        'albums': [album.dict() for album in albums],
        'artists': [artist.dict() for artist in artists]
    }
    return context
# OK
@api.get('/hp')
def get_homepage_content():
    with Session(engine) as session:
        albums = album.get_top_n(5, session)
        artists = artist.get_top_n(3, session)
    name1 = f"Top {len(albums)} Albums"
    name2 = f"Top {len(albums)} Artists"
        
    context = {
        'title': 'Homepage',
        'albums': [album.dict() for album in albums],
        'artists': [artist.dict() for artist in artists],
        'name1': name1,
        'name2':name2
    }
    return context