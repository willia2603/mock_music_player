/* eslint-disable no-unused-vars */

import "../css/DisplayTracks.css";
import { NavLink } from "react-router-dom";
import React, { useRef, useState } from "react";
import { useMusicPlayerContext } from "../contexts/MusicPlayerContext";

const DisplayTracks = ({ tracks, name }) => {
  const [usedOver, setUsedOver] = useState(false);

  const { loadTrack, loadTrackList } = useMusicPlayerContext();

  const setTrack = (track) => {
    loadTrack(track);
    console.log("track set");
  };
  // to make mouseover fire only once
  const setTrackList = () => {
    if (!usedOver) {
      loadTrackList(tracks);
      setUsedOver(true);
    }
  };

  return (
    <>
      <h2>{name}</h2>
      <div className="tracks" onMouseOver={() => setTrackList()}>
        {tracks.map((track) => {
          return (
            <div className="track" key={track.id}>
              <span>
                <u>Track Name:</u>
                <br />
                <br />
                <a onClick={() => setTrack(track)}>{track.name}</a>
              </span>
              <span>
                <u>Album Name:</u> <br /> <br />
                <NavLink to={`/albums/${track.album.id}`}>
                  {track.album.name}
                </NavLink>
              </span>
              <span>
                <u>Artist:</u>
                <br /> <br />
                {track.artists.map((artist) => {
                  return (
                    <NavLink to={`/artists/${artist.id}`} key={artist.id}>
                      <span>
                        {artist.name} <br />
                      </span>
                    </NavLink>
                  );
                })}
              </span>
              <span>
                <u>Duration:</u>
                <br />
                <br />
                {track.duration}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DisplayTracks;
