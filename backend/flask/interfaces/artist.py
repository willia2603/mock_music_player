from models.album import Album
from models.artist import Artist
from models.track import Track
from typing import List


'''get the top “n” by popularity'''
def get_top_n(n : int) -> List[Artist]:
    pass

'''get all the artists'''
def get_all() -> List[Artist]:
    pass

'''get all albums in common from given artists'''
def get_albums(artist_ids : List[int]) -> List[Album]:
    pass

'''get all common tracks from given artists'''
def get_tracks(artist_ids : List[int]) -> List[Track]:
    pass

'''get all artists which contain a given word in any of the fields'''
def get_match(word : str) -> List[Artist]:
    pass