import React, { useState, useEffect } from "react";
import DisplayTracks from "../../components/DisplayTracks";
import DisplayNameImage from "../../components/DisplayNameImage";
import { useParams } from "react-router-dom";
import axios from "axios";

const AlbumTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [album, setAlbum] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/album_tracks/${id}`);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <DisplayNameImage
        path={album.album_cover}
        name={album.album_name}
        class1="albums-disp"
      />
      <DisplayTracks name="Tracks" tracks={tracks}></DisplayTracks>
    </>
  );
};

export default AlbumTracks;
