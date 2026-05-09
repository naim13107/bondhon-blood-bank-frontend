import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import apiClient from "../services/api-client";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters.");
    }
    if (password !== confirm) {
      return toast.error("Passwords do not match.");
    }
    setLoading(true);
    try {
      await apiClient.post("/auth/users/reset_password_confirm/", { // ← fixed endpoint
        uid,
        token,
        new_password: password,
        re_new_password: confirm, // ← Djoser requires this
      });
      toast.success("Password reset! Please log in.");
      navigate("/login");
    } catch (err) {
      const msg =
        err?.response?.data?.token?.[0] ||
        err?.response?.data?.uid?.[0] ||
        err?.response?.data?.new_password?.[0] ||
        "Invalid or expired link. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-2 text-base-content">Reset Password</h2>
          <p className="text-base-content/60 text-sm mb-4">Please enter your new password below.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content">New Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  className="input input-bordered w-full pr-10 bg-base-200 text-base-content focus:border-error"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-error transition-colors"
                  onClick={() => setShowPw((v) => !v)}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content">Confirm Password</span>
              </label>
              <input
                type={showPw ? "text" : "password"}
                className="input input-bordered w-full bg-base-200 text-base-content focus:border-error"
                placeholder="Repeat password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-error w-full text-white shadow-md"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner" /> : "Reset Password"}
            </button>
          </form>

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