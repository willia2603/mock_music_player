/* eslint-disable no-unused-vars */
import "../css/MusicPlayer.css";
import React, { useRef, useEffect } from "react";
import { useMusicPlayerContext } from "../contexts/MusicPlayerContext";

const MusicPlayer = () => {
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
    playerImgSrc,
  } = useMusicPlayerContext();

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
      <div className="player-img">
        <img src={playerImgSrc} alt="album cover" />
      </div>
      <div>
        <span>{description}</span>
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
      <div className="volume">
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
