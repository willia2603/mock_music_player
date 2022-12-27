import { useState, useEffect } from "react";
import DisplayArtistAlbum from "../components/DisplayArtistAlbum";
import DisplayTracks from "../components/DisplayTracks";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [artists, setArtists] = useState(null);
  const [error, setError] = useState("");
  const [name, setName] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `/api/v1/search?q=${searchParams.get("q")}`
        );
        setTracks(response.data.tracks);
        setAlbums(response.data.albums);
        setArtists(response.data.artists);
        setName(response.data.title);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
  }, []);

  const resultsAreEmpty =
    artists.length === 0 && albums.length === 0 && tracks.length === 0;

  if (error) {
    return error;
  }

  if (loading) {
    return <p>Loading</p>;
  }

  if (resultsAreEmpty) {
    return <>No match found</>;
  }

  return (
    <>
      <h1>{name}</h1>
      <DisplayTracks name="Tracks" tracks={tracks}></DisplayTracks>
      <DisplayArtistAlbum
        list={albums}
        name="Albums"
        class1="albums-disp"
        class2="details"
        propriety="img_cover"
        route_name="albums"
      />
      <DisplayArtistAlbum
        list={artists}
        name="Aritsts"
        class1="artists-disp"
        class2="details"
        propriety="artist_img"
        route_name="artists"
      />
    </>
  );
};

export default Search;
