import { useState, useEffect, useCallback } from "react";
import apiClient from "../lib/api-client";
import useMe from "./useMe";

const useSavedList = () => {
  const [savedServices, setSavedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useMe();

  const fetchSavedServices = useCallback(async () => {
    if (!user?.user_id) {
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.get("/user/saved-list");
      setSavedServices(response.data || []);
    } catch (err) {
      console.error("Fetch saved services error:", err.response?.data, err.message);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.user_id]);

  const saveService = useCallback(async (serviceId, isSaved) => {
    if (!user?.user_id) {
      setError("User must be logged in to save or unsave services");
      console.error("No user ID");
      return false;
    }

    try {
      setLoading(true);
      if (isSaved) {
        await apiClient.delete(`/user/remove-saved-service/${serviceId}`);
        // console.log("Service unsaved:", serviceId);
      } else {
        await apiClient.post(`/user/save-service/${serviceId}`);
        // console.log("Service saved:", serviceId);
      }
      await fetchSavedServices();
      return true;
    } catch (err) {
      console.error("Save/Unsave service error:", err.response?.data, err.message);
      setError(err.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user?.user_id, fetchSavedServices]);

  useEffect(() => {
    // console.log("Current user:", user);
    fetchSavedServices();
  }, [fetchSavedServices, user]);

  return { savedServices, loading, error, saveService };
};

export default useSavedList;