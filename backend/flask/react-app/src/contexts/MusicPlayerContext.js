/* eslint-disable no-const-assign */
import { createContext, useContext, useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
// TODO fiix slider and volume
const Context = createContext();

export const MusicPlayerContext = ({ children }) => {
  // VARS -> fix
  const [currTrack, setCurrTrack] = useState(null);
  const [trackList, setTrackList] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [updateInterval] = useState(null);
  const [playerSlider, setPlayerSlider] = useState(null);
  const [description, setDescription] = useState("No song is playing");
  const [playerImgSrc, setPlayerImgSrc] = useState(
    "/static/images/music-placeholder.png"
  );
  useInterval(
    () => {
      let seekPosition = 0;

      if (!isNaN(currTrack.duration)) {
        seekPosition = currTrack.currentTime * (100 / currTrack.duration);
        playerSlider.current.value = seekPosition;
      }
    },
    isPlaying ? 1000 : null
  );

  // FUNCTIONS
  const loadTrack = (track) => {
    if (isPlaying) {
      currTrack.pause();
    }
    // reset slider
    clearInterval(updateInterval);
    resetSlider();

    console.log(track);

    // get track info
    const newCurrTrack = new Audio();
    newCurrTrack.id = track.id;
    newCurrTrack.src = track.file;
    newCurrTrack.name = track.name;
    newCurrTrack.artists = track.artists;
    newCurrTrack.album_name = track.album.name;
    newCurrTrack.album_cover = track.album.img_cover;
    setPlayerImgSrc(track.album.img_cover);

    // load track
    try {
      newCurrTrack.load();
    } catch {
      alert("This is a dummy file, please choose another one");
    }

    // Play track
    playTrack(newCurrTrack);

    // make next track play when current track ends
    newCurrTrack.addEventListener("ended", () => {
      pauseCurrentTrack();
      playNext();
    });
    setCurrTrack(newCurrTrack);
  };

  const playTrack = (track) => {
    track.play();
    setIsPlaying(true);
  };

  const playCurrentTrack = () => {
    // play loaded track
    if (currTrack != null) {
      playTrack(currTrack);
    } else {
      alert("Please select a track first");
    }
  };

  const pauseCurrentTrack = () => {
    // Pause the loaded track
    currTrack.pause();
    setIsPlaying(false);
  };

  const setVolume = (value) => {
    // Set the volume
    currTrack.volume = value;
  };
  const setSlider = () => {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    const seekTo = currTrack.duration * (playerSlider.current.value / 100);

    // Set the current track position to the calculated seek position
    currTrack.currentTime = seekTo;
  };

  const loadTrackList = (tracks) => {
    setTrackList(tracks);
  };

  const resetSlider = () => {
    console.log("slider resetted");
    playerSlider.current.value = 0;
  };

  const createSlider = (slider) => {
    setPlayerSlider(slider);
    console.log("slider created");
  };

  const playNext = () => {
    if (trackList == null) {
      alert("Please select a track first");
      return [];
    }
    if (trackList[trackList.length - 1]["id"] == currTrack.id) {
      console.log("last track, go to first");
      loadTrack(trackList[0]);
    } else {
      console.log("go to next track");
      let curr_idx = trackList.findIndex((track) => track.id == currTrack.id);
      loadTrack(trackList[curr_idx + 1]);
    }
  };

  const playPrevious = () => {
    if (trackList[0]["id"] == currTrack.id) {
      console.log("first track, got to last one");
      loadTrack(trackList[trackList.length - 1]);
    } else {
      console.log("go to previous track");
      let curr_idx = trackList.findIndex((track) => track.id == currTrack.id);
      loadTrack(trackList[curr_idx - 1]);
    }
  };
  useEffect(() => {
    if (currTrack) {
      setDescription(`
	      ${currTrack.name} (${currTrack.album_name}) by ${currTrack.artists
        .map((artist) => artist.name)
        .join(", ")}
	      `);
    }
  }, [currTrack]);

  return (
    <Context.Provider
      value={{
        loadTrack,
        loadTrackList,
        createSlider,
        pauseCurrentTrack,
        playCurrentTrack,
        setVolume,
        setSlider,
        playNext,
        playPrevious,
        isPlaying,
        description,
        playerImgSrc,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMusicPlayerContext = () => {
  return useContext(Context);
};
