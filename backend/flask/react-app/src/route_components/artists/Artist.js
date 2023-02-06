import DisplayArtistAlbum from "../../components/DisplayArtistAlbum";
import { useState, useEffect } from "react";
import axios from "axios";

function Artist() {
  const [artists, setArtists] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const class1 = "artists-disp";
  const class2 = "";
  const propriety = "artist_img";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/artists"
        );

        setArtists(response.data.artists);
        setName(response.data.title);
        setLoading(false);
      } catch (error) {
        setError(error.message);
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
        list={artists}
        name={name}
        class1={class1}
        class2={class2}
        propriety={propriety}
        route_name="artists"
      />
    </div>
  );
}

export default Artist;
