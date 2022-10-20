from database import Base
from models.album import Album
from models.artist import Artist
from models.track import Track
from models.association_tables import album_artist_association, track_artist_association

# This file is used to work with alembic (to create empty tables with alembic)
# -> import base then models s.t model schemas get 'saved' in Base. Base.metadata is then used in env.py to get the infor about all table and create them when doing the first commit with alembic (see commands for example)
