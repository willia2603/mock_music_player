import { Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DisplayTracks from "../../components/DisplayTracks";
import DisplayNameImage from "../../components/DisplayNameImage";
import DisplayArtistAlbum from "../../components/DisplayArtistAlbum";
import useFetch from "../../hooks/useFetch";

const ArtistInfo = () => {
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbum] = useState([]);
  const [artistName, setName] = useState("");
  const [artistImg, setImg] = useState("");
  const { id } = useParams();
  const url = `/api/v1/artists/${id}`;
  const { data, loading, error, empty } = useFetch(url);

  useEffect(() => {
    if (data) {
      setTracks(data.tracks);
      setAlbum(data.albums);
      setName(data.title);
      setImg(data.artist_img);
    }
  }, [data]);

  if (error) {
    return <p>{error}</p>;
  }

  if (empty) {
    return <Navigate to={"/404"} />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <DisplayNameImage
        path={artistImg}
        name={artistName}
        class1="artists-disp"
      />
      <DisplayTracks name="Tracks" tracks={tracks} />
      <DisplayArtistAlbum
        list={albums}
        name="Albums"
        class1="albums-disp"
        class2=""
        propriety="img_cover"
        route_name="albums"
      />
    </>
  );
};

export default ArtistInfo;
