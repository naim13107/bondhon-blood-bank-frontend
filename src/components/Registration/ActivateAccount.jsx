import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import ErroAlert from "../ErroAlert"; 
import apiClient from "../../services/api-client";

const ActivateAccount = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { uid, token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .post("/auth/users/activation/", { uid, token })
      .then(() => {
        setMessage("Account activated successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((error) => {
        setError("Something went wrong. Please check your activation link or try registering again.");
        console.log("Activation Error:", error);
      });
  }, [uid, token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <div className="card w-full max-w-md bg-white shadow-xl border border-gray-100 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Activation</h2>
        
        {message && (
          <div role="alert" className="alert alert-success text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{message}</span>
          </div>
        )}
        
        {error && <ErroAlert error={error} />}
        
        {/* Fallback spinner while waiting for the API response */}
        {!message && !error && (
          <div className="mt-4">
            <span className="loading loading-spinner text-red-600"></span>
            <p className="text-gray-500 mt-2">Verifying your account...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivateAccount;