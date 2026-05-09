// ============================================================
// FILE: src/pages/ForgotPassword.jsx
// ============================================================

import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/api-client";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email.");
    setLoading(true);
    try {
      await apiClient.post("/accounts/forgot-password/", { email });
      setSent(true);
      toast.success("Reset link sent! Check your email.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-2 text-base-content">Forgot Password</h2>

          {sent ? (
            <div className="alert alert-success shadow-md text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                If that email is registered, you'll receive a reset link shortly.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-base-content/70 text-sm">
                Enter your registered email and we'll send you a reset link.
              </p>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full bg-base-200 text-base-content focus:border-error"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-error w-full text-white shadow-md"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner" /> : "Send Reset Link"}
              </button>
            </form>
          )}

          <div className="text-center mt-6">
            <Link to="/login" className="text-sm font-medium text-base-content/60 hover:text-error transition-colors">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}