import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  useEffect(() => {
    if (authTokens) {
      fetchUserProfile(authTokens.access);
    }
  }, [authTokens]);

  // Fetch user Profile
  const fetchUserProfile = async (directToken) => {
    const tokenToUse = directToken || JSON.parse(localStorage.getItem("authTokens"))?.access;
    
    if (!tokenToUse) return;

    try {
      // Added trailing slash to prevent Django 301 redirects from dropping the token
      const response = await apiClient.get("/auth/users/me/", {
        headers: { Authorization: `JWT ${tokenToUse}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log("Error Fetching user", error);
    }
  };

  // Login User
  const loginUser = async (userData) => {
    setErrorMsg("");
    try {
      // Added trailing slash
      const response = await apiClient.post("/auth/jwt/create/", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      // After login, set user by explicitly passing the fresh token
      await fetchUserProfile(response.data.access);
    } catch (error) {
      setErrorMsg(error.response?.data?.detail || "Login failed");
      throw error; // Re-throw to let the Login component know it failed
    }
  };

  // Register User
  const registerUser = async (userData) => {
    setErrorMsg("");
    try {
      // Added trailing slash
      await apiClient.post("/auth/users/", userData);
      return {
        success: true,
        message: "Registration successful. Check your email to activate your account.",
      };
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = Object.values(error.response.data)
          .flat()
          .join("\n");
        setErrorMsg(errorMessage);
        return { success: false, message: errorMessage };
      }
      setErrorMsg("Registration failed. Please try again");
      return {
        success: false,
        message: "Registration failed. Please try again",
      };
    }
  };

  // Logout User
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return { user, errorMsg, loginUser, registerUser, logoutUser };
};

export default useAuth;