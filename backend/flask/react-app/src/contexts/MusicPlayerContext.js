/* eslint-disable no-const-assign */
import { createContext, useContext, useState } from "react";
// TODO fiix slider and volume
const Context = createContext();

export const MusicPlayerContext = ({ children }) => {
  // VARS -> fix
  let [currTrack, setCurrTrack] = useState(null);
  let [trackList, setTrackList] = useState(null);
  let [isPlaying, setIsPlaying] = useState(false);
  let [updateInterval] = useState(null);
  let [playerSlider, setPlayerSlider] = useState(null);
  let [description] = useState("No song is playing");
  //   const [trackList, setTrackList] = useState([])
  // const [currTrack, setCurrTrack] = useState(null)

  // FUNCTIONS
  const loadTrack = (track) => {
    if (isPlaying) {
      currTrack.pause();
    }
    // reset slider
    clearInterval(updateInterval);
    resetSlider();

    // get track info
    // setCurrTrack(new Audio());
    currTrack = new Audio();
    currTrack.id = track.id;
    currTrack.src = track.file;
    currTrack.name = track.name;
    currTrack.artists = track.artists;
    currTrack.album_name = track.album.name;
    currTrack.album_cover = track.album.img_cover;

    // load track
    try {
      currTrack.load();
    } catch {
      alert("This is a dummy file, please choose another one");
    }
    // setDescription();
    // console.log(description);
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateInterval = setInterval(seekUpdate, 1000);

    // Play track
    playTrack();

    // make next track play when current track ends
    currTrack.addEventListener("ended", function () {
      pauseTrack();
      playNext();
    });
  };
  // not used yet
  const setDescription = () => {
    description = `
    <u>Track Name:</u><br>${currTrack.name} <br>
    <u>Album Name:</u><br>${currTrack.album_name}<br>
    <u>Artist Name:</u><br>${currTrack.artists
      .map((artist) => artist.name)
      .join(", ")}
    `;
  };
  const seekUpdate = () => {
    let seekPosition = 0;

    if (!isNaN(currTrack.duration)) {
      seekPosition = currTrack.currentTime * (100 / currTrack.duration);
      playerSlider.current.value = seekPosition;
    }
  };

  const playTrack = () => {
    // play loaded track
    if (currTrack != null) {
      currTrack.play();
      //   setIsPlaying(true);
      isPlaying = true;
    } else {
      alert("Please select a track first");
    }
  };

  const pauseTrack = () => {
    // Pause the loaded track
    currTrack.pause();
    // setIsPlaying(false);
    isPlaying = false;
  };
  const setVolume = (value) => {
    // Set the volume
    currTrack.volume = value;
  };
  const setSlider = () => {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    let seekto = currTrack.duration * (playerSlider.current.value / 100);

    // Set the current track position to the calculated seek position
    currTrack.currentTime = seekto;
  };

  const loadTrackList = (tracks) => {
    // setTrackList(tracks)
    trackList = tracks;
  };

  const resetSlider = () => {
    console.log("slider resetted");
    playerSlider.current.value = 0;
  };

  const createSlider = (slider) => {
    // playerSlider(slider)
    playerSlider = slider;
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

  return (
    <Context.Provider
      value={{
        loadTrack,
        loadTrackList,
        createSlider,
        pauseTrack,
        playTrack,
        setVolume,
        setSlider,
        playNext,
        playPrevious,
        isPlaying,
        description,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMusicPlayerContext = () => {
  return useContext(Context);
};
