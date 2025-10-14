import { useEffect, useState, useCallback } from "react";
import apiClient from "../lib/api-client";
const useUserDetail = ({ id, role: forcedRole }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // -----------------------------------------------------------------
  // Build correct endpoint
  // -----------------------------------------------------------------
  const getEndpoint = useCallback(() => {
    const role =
      forcedRole ||
      (window.location.pathname.includes("/seller") ? "Seller" : "Buyer");

    const prefix = role === "Seller" ? "seller" : "user";
    return `/administration/${prefix}/details/${id}`;
  }, [id, forcedRole]);

  const fetchDetail = useCallback(async () => {
    if (!id) {
      setError("User id is required");
      setLoading(false);
      return;
    }

    let mounted = true;
    try {
      setLoading(true);
      setError(null);

      const endpoint = getEndpoint();
      const res = await apiClient.get(endpoint);

      if (mounted) {
        // Attach the resolved role for UI convenience
        setData({ ...res.data, role: forcedRole || (endpoint.includes("seller") ? "Seller" : "Buyer") });
      }
    } catch (err) {
      if (mounted) {
        setError(err.response?.data?.message || err.message || "Failed to load user detail");
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
    return () => {
      mounted = false;
    };
  }, [id, getEndpoint]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const refetch = () => fetchDetail();

  return { data, loading, error, refetch };
};

export default useUserDetail;