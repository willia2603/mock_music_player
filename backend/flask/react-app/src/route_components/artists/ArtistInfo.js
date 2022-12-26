import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayTracks from "../../components/DisplayTracks";
import DisplayNameImage from "../../components/DisplayNameImage";
import DisplayArtistAlbum from "../../components/DisplayArtistAlbum";

const ArtistInfo = () => {
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbum] = useState([]);
  const [artistName, setName] = useState("");
  const [artistImg, setImg] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/artists/${id}`);

        setTracks(response.data.tracks);
        setAlbum(response.data.albums);
        setName(response.data.title);
        setImg(response.data.artist_img);
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
