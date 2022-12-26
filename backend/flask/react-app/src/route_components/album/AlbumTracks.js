import React, { useState, useEffect } from "react";
import DisplayTracks from "../../components/DisplayTracks";
import DisplayNameImage from "../../components/DisplayNameImage";
import { useParams } from "react-router-dom";
import axios from "axios";

function AlbumTracks() {
  const [tracks, setTracks] = useState([]);
  const [album, setAlbum] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/album_tracks/${id}`
        );

        setTracks(response.data.tracks);
        setAlbum(response.data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      {!loading && (
        <>
          <DisplayNameImage
            path={album.album_cover}
            name={album.album_name}
            class1="albums-disp"
          ></DisplayNameImage>
          <DisplayTracks name="Tracks" tracks={tracks}></DisplayTracks>
        </>
      )}
    </>
  );
}

export default AlbumTracks;
