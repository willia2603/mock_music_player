from flask import Blueprint, render_template, abort, url_for
from jinja2.exceptions import TemplateNotFound
import interfaces.album as album
from sqlalchemy.orm import Session
from database.database import engine
import json

album_page = Blueprint('albums_page', __name__,
                       template_folder='templates/albums')
                       
@album_page.get('/albums')
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
        
        
@album_page.get('/albums/<int:id>')   
def goto_id(id: int):
    """
    It gets the tracks for the album with the given id, and then renders the template with the tracks
    and album information
    
    :param id: the id of the album
    :type id: int
    :return: A list of dictionaries
    """
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
            # 'tracks': tracks
        }
        return render_template('albums_tracks.html', **context)
    except TemplateNotFound:
        print('error')
        abort(404)
