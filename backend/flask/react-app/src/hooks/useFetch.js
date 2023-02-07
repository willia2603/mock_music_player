import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        if (Object.keys(response.data).length == 0) {
          setEmpty(true);
        } else {
          setData(response.data);
        }
        setLoading(false);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error, empty };
};

export default useFetch;
