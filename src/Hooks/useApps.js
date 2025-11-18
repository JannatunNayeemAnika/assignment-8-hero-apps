import axios from "axios";
import { useEffect, useState } from "react";

const useApps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios.get('/AppsData.json')
      .then(res => {
        const data = res.data;

        
        if (Array.isArray(data)) {
          setApps(data);
        }

        
        else if (Array.isArray(data.apps)) {
          setApps(data.apps);
        }

        else {
          console.error("AppsData.json is not in valid array format");
          setApps([]);
        }
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { apps, loading, error };
};

export default useApps;
