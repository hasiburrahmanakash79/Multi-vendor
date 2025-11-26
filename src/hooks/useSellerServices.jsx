import { useCallback, useEffect, useState } from 'react';
import apiClient from '../lib/api-client';

const useSellerServices = (shouldFetch) => {
  const [service, setServices] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const fetchServices = useCallback(async () => {
    if (!shouldFetch) return; // ❌ Seller na hole fetch hobe na

    try {
      setLoading(true);
      const res = await apiClient.get("/service/list");
      setServices(res.data || null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setServices(null);
    } finally {
      setLoading(false);
    }
  }, [shouldFetch]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { service, loading, error, refetch: fetchServices };
};

export default useSellerServices;
