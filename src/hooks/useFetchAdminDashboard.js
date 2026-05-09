import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/api-client';
import { toast } from 'react-hot-toast';

const useFetchAdminDashboard = (user, navigate) => {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState(null); // Added stats state
  const [loading, setLoading] = useState(true);

  const tokenString = localStorage.getItem("authTokens");
  const tokens = tokenString ? JSON.parse(tokenString) : null;
  const config = { headers: { Authorization: `JWT ${tokens?.access}` } };

  const fetchAdminData = useCallback(async () => {
    if (user && !user.is_staff && !user.is_superuser) {
      toast.error("Access denied. Admins only.");
      navigate("/dashboard");
      return;
    }

    setLoading(true);
    try {
      // Hit the new dedicated summary endpoint
      const response = await apiClient.get("/admin-panel/summary/", config);
      
      setDonors(response.data.all_donors);
      setRequests(response.data.all_requests);
      setStats(response.data.stats);
    } catch (error) {
      toast.error("Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  }, [user, navigate, tokens?.access]);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  // DELETE REQUEST — calls the new admin endpoint
  const deleteRequest = async (id) => {
    if (!window.confirm("Delete this request? This cannot be undone.")) return;
    try {
      await apiClient.delete(`/admin-panel/requests/${id}/`, config);
      setRequests(prev => prev.filter(req => req.id !== id));
      toast.success("Request deleted successfully.");
    } catch (error) {
      const msg = error.response?.data?.error || "Failed to delete request.";
      toast.error(msg);
    }
  };

  // DELETE USER — new function
  const deleteUser = async (userId) => {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    try {
      await apiClient.delete(`/admin-panel/users/${userId}/`, config);
      setDonors(prev => prev.filter(d => d.user !== userId));
      toast.success("User deleted successfully.");
    } catch (error) {
      const msg = error.response?.data?.error || "Failed to delete user.";
      toast.error(msg);
    }
  };

 return { donors, requests, stats, loading, deleteRequest, deleteUser };
};


export default useFetchAdminDashboard;