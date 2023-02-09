import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import DisplayTracks from "../components/DisplayTracks";

const Track = () => {
  const [tracks, setTracks] = useState([]);
  const [name, setName] = useState("");
  const url = "http://localhost:5000/api/v1/tracks";

  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    if (data) {
      setTracks(data.tracks);
      setName(data["title"]);
    }
  }, [data]);

  if (error) {
    return error;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return <DisplayTracks name={name} tracks={tracks} />;
};

export default Track;
