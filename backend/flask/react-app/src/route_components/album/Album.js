import DisplayArtistAlbum from "../../components/DisplayArtistAlbum";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Album = () => {
  const [albums, setAlbums] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const class1 = "albums-disp";
  const class2 = "";
  const propriety = "img_cover";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/albums");

        setAlbums(response.data.albums);
        setName(response.data.title);
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
