/* eslint-disable no-unused-vars */
import "../css/DisplayTracks.css";
import { NavLink } from "react-router-dom";
import React, { useRef, useEffect } from "react";

const DisplayTracks = ({ tracks, name }) => {
  const loadTracks = useRef();

  const loadTrack = (track) => {
    // store.commit('loadTrack', track)
    console.log("track loaded");
  };

  const setTrackList = () => {
    // store.commit('setTrackList', props.tracks)
    console.log("track list setted");
  };

  useEffect(() => {
    // useEffect instead of onMouseOver to have event fire only once
    if (loadTracks.current) {
      loadTracks.current.addEventListener("mouseover", setTrackList, {
        once: true,
      });
    }
  }, []);

  return (
    <>
      <h2>{name}</h2>
      <div className="tracks" ref={loadTracks}>
        {tracks.map((track) => {
          return (
            <div className="track" key={track.id}>
              <span>
                <u>Track Name:</u>
                <br />
                <br />
                <a onClick={() => loadTrack(track)}>{track.name}</a>
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
