from database.database import Base
from models.album import Album
from models.artist import Artist
from models.track import Track
from models.association_tables import album_artist_association, track_artist_association

'''This file is used to work with alembic (to create empty tables with alembic)
Here we import Base from database and the import the models as well, s.t model schemas get 'saved' in Base. 
Base.metadata is then used in env.py (assigned to target_metadata variable) to get the info about all tables and create them by using the command 'alembic revision --autogenerate -m "First commit: create tables"'
'''
