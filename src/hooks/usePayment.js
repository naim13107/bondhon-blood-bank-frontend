import { useState } from 'react';
import apiClient from '../services/api-client';
import { toast } from 'react-hot-toast';

const usePayment = () => {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async (amount) => {
    setLoading(true);
    
    // 1. Grab tokens - strictly required for this backend endpoint
    const tokenString = localStorage.getItem("authTokens");
    const tokens = tokenString ? JSON.parse(tokenString) : null;

    if (!tokens?.access) {
      toast.error("You must be logged in to make a donation.");
      setLoading(false);
      return;
    }

    const config = { headers: { Authorization: `JWT ${tokens.access}` } };

    try {
      const response = await apiClient.post('/payment/initiate/', { amount }, config);
      
      const paymentUrl = response.data.payment_url; 
      
      if (paymentUrl) {
        window.location.href = paymentUrl; 
      } else {
        toast.error("Invalid response from payment server.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      toast.error(error.response?.data?.error || "Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  return { initiatePayment, loading };
};

export default usePayment;