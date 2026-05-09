// ============================================================
// FILE: src/pages/ForgotPassword.jsx   (NEW FILE)
// ============================================================
// Add route in App.jsx:  <Route path="/forgot-password" element={<ForgotPassword />} />
// Add link on Login page: <Link to="/forgot-password">Forgot password?</Link>
// ============================================================

import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient"; // adjust path if different
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
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-2">Forgot Password</h2>

          {sent ? (
            <div className="alert alert-success">
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
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner" /> : "Send Reset Link"}
              </button>
            </form>
          )}

          <div className="text-center mt-4">
            <Link to="/login" className="link link-primary text-sm">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}