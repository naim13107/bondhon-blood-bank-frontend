import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/api-client';
import { toast } from 'react-hot-toast';

const useFetchAdminDashboard = (user, navigate) => {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const tokenString = localStorage.getItem("authTokens");
  const tokens = tokenString ? JSON.parse(tokenString) : null;
  const config = { headers: { Authorization: `JWT ${tokens?.access}` } };

  const fetchAdminData = useCallback(async () => {
    // Admin Guard
    if (user && !user.is_staff && !user.is_superuser) {
      toast.error("Access denied. Admins only.");
      navigate("/dashboard");
      return;
    }

    setLoading(true);
    try {
      // Fetch both endpoints concurrently for better performance
      const [donorsRes, requestsRes] = await Promise.all([
        apiClient.get("/donors/", config),
        apiClient.get("/requests/", config)
      ]);
      
      setDonors(donorsRes.data.results || donorsRes.data);
      setRequests(requestsRes.data.results || requestsRes.data);
    } catch (error) {
      toast.error("Failed to load admin data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user, navigate, tokens?.access]);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const deleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request? This action cannot be undone.")) return;
    
    try {
      await apiClient.delete(`/requests/${id}/`, config);
      // Update local state to remove the deleted item instantly
      setRequests(prev => prev.filter(req => req.id !== id));
      toast.success("Request deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete request.");
    }
  };

  return { donors, requests, loading, deleteRequest };
};

export default useFetchAdminDashboard;