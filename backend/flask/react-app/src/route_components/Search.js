import { useState, useEffect } from "react";
import DisplayArtistAlbum from "../components/DisplayArtistAlbum";
import DisplayTracks from "../components/DisplayTracks";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Search = () => {
  const { query } = useParams();
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [name, setName] = useState({});

  const url = `/api/v1/search?q=${query}`;

  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    if (data) {
      setTracks(data.tracks);
      setAlbums(data.albums);
      setArtists(data.artists);
      setName(data.title);
    }
  }, [data]);

  const resultsAreEmpty = () =>
    artists &&
    albums &&
    tracks &&
    artists.length === 0 &&
    albums.length === 0 &&
    tracks.length === 0;

  if (error) {
    return error;
  }

  if (loading) {
    return <p>Loading</p>;
  }

  if (resultsAreEmpty()) {
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
