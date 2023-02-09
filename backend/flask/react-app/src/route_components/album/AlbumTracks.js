import React, { useState, useEffect } from "react";
import DisplayTracks from "../../components/DisplayTracks";
import DisplayNameImage from "../../components/DisplayNameImage";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const AlbumTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [album, setAlbum] = useState([]);
  const { id } = useParams();

  const url = `http://localhost:5000/api/v1/album_tracks/${id}`;

  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    if (data) {
      setTracks(data.tracks);
      setAlbum(data);
    }
  }, [data]);

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
