import DisplayArtistAlbum from "../../components/DisplayArtistAlbum";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

function Artist() {
  const [artists, setArtists] = useState([]);
  const [name, setName] = useState("");

  const class1 = "artists-disp";
  const class2 = "";
  const propriety = "artist_img";

  const url = "http://localhost:5000/api/v1/artists";

  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    if (data) {
      setArtists(data.artists);
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
