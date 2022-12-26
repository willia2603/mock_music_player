import { useState, useEffect } from "react";
import axios from "axios";
import DispalyTracks from "../components/DisplayTracks";
function Track() {
  const [tracks, setTracks] = useState(null);
  const [name, setName] = useState("gghfhjgjh");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/tracks");
        setTracks(response.data.tracks);
        setName(response.data["title"]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);
  if (error) {
    return error;
  }

  return (
    <>
      {!loading && <DispalyTracks name={name} tracks={tracks}></DispalyTracks>}
    </>
  );
}

export default Track;
