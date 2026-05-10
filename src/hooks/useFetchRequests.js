import { useEffect, useState, useCallback } from "react";
import apiClient from "../services/api-client";

const useFetchRequests = (page, bloodGroup, search, ordering) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  
 
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/requests/", {
        params: {
          page,
          blood_group: bloodGroup || undefined,
          search: search || undefined,
          ordering: ordering || undefined,
        },
      })
      .then((res) => {
        setRequests(res.data.results);
        setTotalPages(Math.ceil(res.data.count / 10)); 
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [page, bloodGroup, search, ordering, refreshTrigger]); 

  return { requests, loading, totalPages, refresh };
};

export default useFetchRequests;