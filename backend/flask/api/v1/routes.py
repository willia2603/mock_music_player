from flask import Blueprint
import interfaces.album as album
from sqlalchemy.orm import Session
from database.database import engine
import json
import interfaces.track as track
import interfaces.artist as artist
from flask import request

'''
This API used to interact more easily with Vue and React.
'''

api = Blueprint('api', __name__)

@api.get('/tracks')
def get_all_tracks():
    try:
        with Session(engine) as session:
            tracks = track.get_all(session)
        context = {
                'title': 'Tracks',
                'tracks': [track.dict() for track in tracks]
            }
        return context
    except:
        print('api error in /tracks')
        return {}
    
@api.get('/albums')
def get_all_albums():
    try:
        with Session(engine) as session:
                albums = album.get_all(session)
        albums = [album.dict() for album in albums]
        context = {
                'title': 'Albums',
                'albums': albums
            }
        return context
    except:
        print('api error in /albums')
        return {}
    
@api.get('/album_tracks/<int:id>')
def get_album_info(id : int):
    try:
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
    except:
        print('api error in /album_tracks/<int:id>')
        return {}

@api.get('/artists/<int:id>')
def get_artist_info(id: int):
    try:
        with Session(engine) as session:
            art = artist.get_artist(id, session)[0]
        context = {
                'title': art.name,
                'artist_img': art.artist_img,
                'tracks': [track.dict() for track in art.tracks],
                'albums': [album.dict() for album in art.albums]
        }
        return context
    except:
        print('api error in /artists/<int:id>')
        return {}
    
@api.get('/artists')
def artists():
    try:
        with Session(engine) as session:
            artists = artist.get_all(session)
        context = {
            'title': 'Artists',
            'artists': [artist.dict() for artist in artists]
        }
        return context
    except:
        print('api error in /artists')
        return {}

# OK
@api.get('/search')
def get_match():
    try:
        word = request.args.getlist('q')[0]
        print(word)
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
    except:
        print('api error in /search')
        return {}
    
     
@api.get('/hp')
def get_homepage_content():
    try:
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
    except:
        print('api error in /hp')
        return {}
    