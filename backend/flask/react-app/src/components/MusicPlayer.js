/* eslint-disable no-unused-vars */
import "../css/MusicPlayer.css";
import React, { useRef, useEffect } from "react";
import { useMusicPlayerContext } from "../contexts/MusicPlayerContext";

const MusicPlayer = () => {
  // const [isPlaying, setIsPlaying] = useState(false);
  const playerVolume = useRef();
  const PlayerSlider = useRef();

  const {
    createSlider,
    pauseCurrentTrack,
    playCurrentTrack,
    setVolume,
    setSlider,
    playNext,
    playPrevious,
    description,
    isPlaying,
  } = useMusicPlayerContext();
  // HELPERS
  function setupTrackInfos() {
    // if (curr_track != null) {
    //     playerCover.value.src = curr_track.value.album_cover
    //     playerSongName.value.innerHTML = "<u>Track Name:</u><br> " + curr_track.value.name
    //     playerAlbum.value.innerHTML = "<u>Album Name:</u><br> " + curr_track.value.album_name
    //     playerArtist.value.innerHTML = "<u>Artist Name:</u><br> " + curr_track.value.artists.map(artist => artist.name).join(', ')
    // }
  }

  // ACTUAL PLAYER MODIFIERS
  function next() {
    playNext();
  }
  function previous() {
    playPrevious();
  }

  function changeVolume() {
    setVolume(playerVolume.current.value / 100);
  }

  function changeSlider() {
    setSlider();
  }

  useEffect(() => {
    createSlider(PlayerSlider);
  }, []);

  useEffect(() => {
    console.log("isPlaying changed", isPlaying);
  }, [isPlaying]);

  return (
    <div className="music-player">
      <div>
        <button onClick={previous}>Previous</button>
        {isPlaying ? (
          <button onClick={pauseCurrentTrack}>Pause</button>
        ) : (
          <button onClick={playCurrentTrack}>Play</button>
        )}
        <button onClick={next}>Next</button>
      </div>
      <img src="/static/images/album_placeholder.jpeg" alt="album cover" />
      <div>
        <span>{description}</span>
        {/* <br />
        <span></span>
        <br />
        <span></span> */}
        <br />
        <input
          ref={PlayerSlider}
          type="range"
          min="1"
          max="100"
          defaultValue="0"
          onInput={changeSlider}
        />
      </div>
      <div>
        <span>Volume</span>
        <input
          ref={playerVolume}
          type="range"
          min="1"
          max="100"
          defaultValue="30"
          onChange={changeVolume}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
