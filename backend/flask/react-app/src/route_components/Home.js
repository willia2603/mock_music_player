import DisplayArtistAlbum from "../components/DisplayArtistAlbum";
import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [name1, setName1] = useState("");
  const [artists, setArtists] = useState([]);
  const [name2, setName2] = useState("");

  const url = "http://localhost:5000/api/v1/hp";

  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    if (data) {
      setArtists(data.artists);
      setAlbums(data.albums);
      setName1(data.name1);
      setName2(data.name2);
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
      <DisplayArtistAlbum
        list={albums}
        name={name1}
        class1="albums-disp"
        class2="details"
        class3="hp"
        propriety="img_cover"
        route_name="albums"
      />
      <DisplayArtistAlbum
        list={artists}
        name={name2}
        class1="artists-disp"
        class2="details"
        class3="hp"
        propriety="artist_img"
        route_name="artists"
      />
    </>
  );
};

export default Home;
