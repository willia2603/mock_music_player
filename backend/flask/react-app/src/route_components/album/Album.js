import DisplayArtistAlbum from "../../components/DisplayArtistAlbum";
import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const Album = () => {
  const [albums, setAlbums] = useState([]);
  const [name, setName] = useState("");

  const class1 = "albums-disp";
  const class2 = "";
  const propriety = "img_cover";

  const url = "http://localhost:5000/api/v1/albums";

  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    if (data) {
      setAlbums(data.albums);
      setName(data.title);
    }
  }, [data]);

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <DisplayArtistAlbum
        list={albums}
        name={name}
        class1={class1}
        class2={class2}
        propriety={propriety}
        route_name="albums"
      />
    </div>
  );
};

export default Album;
