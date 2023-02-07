import DisplayArtistAlbum from "../components/DisplayArtistAlbum";
import React, { useState, useEffect } from "react";
import axios from "axios";

// TODO find out why container doesn't scroll

// TODO create custom hook

/* Feedback
 * Important!
 * Prefer using ES6 syntax (e.g. const func = () => {} instead of function() {})
 * Consider using custom hook for API calls (or something like react-query)
 * Less important
 * Add relevant style option to eslintrc (like deactivating proptypes) and prettier (like tab width)
 * Consider using react prop types or Typscript
 */
const Home = () => {
  const [albums, setAlbums] = useState(null);
  const [name1, setName1] = useState("");
  const [artists, setArtists] = useState(null);
  const [name2, setName2] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/hp");
        setArtists(response.data.artists);
        setAlbums(response.data.albums);
        // console.log(response.data.albums)
        setName1(response.data.name1);
        setName2(response.data.name2);
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
