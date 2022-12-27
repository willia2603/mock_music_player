/* eslint-disable no-unused-vars */
import "../css/MusicPlayer.css";
import React, { useState } from "react";

// TODO make music play and buttons work
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  // HELPERS
  function setupTrackInfos() {
    // if (curr_track != null) {
    //     playerCover.value.src = curr_track.value.album_cover
    //     playerSongName.value.innerHTML = "<u>Track Name:</u><br> " + curr_track.value.name
    //     playerAlbum.value.innerHTML = "<u>Album Name:</u><br> " + curr_track.value.album_name
    //     playerArtist.value.innerHTML = "<u>Artist Name:</u><br> " + curr_track.value.artists.map(artist => artist.name).join(', ')
    // }
  }

  function restSlider() {
    // track_slider.value = 0
  }

  // ACTUAL PLAYER MODIFIERS
  function play() {
    // store.commit('playTrack')
  }

  function pause() {
    // store.commit('pauseTrack')
  }
  function playNext() {
    // restSlider()
    // store.commit('clearUpdateTimer')
    // store.commit('playNext')
  }
  function playPrevious() {
    // store.commit('playPrevious')
  }

  function setVolume() {
    // store.commit('setVolume', playerVolume.value.value / 100)
  }

  function initSlider() {
    // store.commit('initSlider',playerSlider)
  }
  function setSlider() {
    // store.commit('setSlider')
  }
  initSlider();

  return (
    <div className="music-player">
      <div>
        <button onClick={playPrevious}>Previous</button>
        {isPlaying ? (
          <button onClick={pause}>Play</button>
        ) : (
          <button onClick={play}>Next</button>
        )}
        <button onClick={playNext}>Next</button>
      </div>
      <img src="/static/images/album_placeholder.jpeg" alt="album cover" />
      <div>
        <span>No song is playing</span>
        <br />
        <span></span>
        <br />
        <span></span>
        <input
          type="range"
          min="1"
          max="100"
          defaultValue="0"
          onInput={setSlider}
        />
      </div>
      <div>
        <span>Volume</span>
        <input
          type="range"
          min="1"
          max="100"
          defaultValue="30"
          onChange={setVolume}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
