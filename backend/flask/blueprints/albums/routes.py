from flask import Blueprint, render_template, abort, url_for
from jinja2.exceptions import TemplateNotFound
import interfaces.album as album
from sqlalchemy.orm import Session
from database.database import engine
import json

# A Blueprint is a way to organize a group of related views and other code.
album_page = Blueprint('albums_page', __name__,
                       template_folder='templates/albums')
                       
@album_page.route('/albums')
def albums():
    try:
        with Session(engine) as session:
            albums = album.get_all(session)
        context = {
            'title': 'Albums',
            'albums': albums
        }
        return render_template('albums.html', **context)
    except TemplateNotFound:
        print('error')
        abort(404)
        
        
@album_page.route('/albums/<int:id>')   
def goto_id(id: int):
    try:
        with Session(engine) as session:
            tracks = album.get_tracks(id, session)
        album_name = tracks[0].album.name
        album_cover = tracks[0].album.img_cover
        
        context = {
            'title': f'Album {id}',
            'album_name': album_name,
            'album_cover':album_cover,
            'tracks': [track.dict() for track in tracks]
            # 'tracks': tracks
        }
        return render_template('albums_tracks.html', **context)
    except TemplateNotFound:
        print('error')
        abort(404)
