import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/api-client"; 
import { toast } from "react-hot-toast";

const AddRequest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    blood_group: "",
    bags_needed: 1,
    hospital_name: "",
    donation_date: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Grab the authTokens object from localStorage
    const tokenString = localStorage.getItem("authTokens");
    const tokens = tokenString ? JSON.parse(tokenString) : null;

    apiClient
      .post("/requests/", formData, {
        headers: {
          // 2. Attach the token specifically for this protected endpoint
          Authorization: `JWT ${tokens?.access}`
        }
      })
      .then(() => {
        toast.success("Blood request created successfully!");
        navigate("/requests");
      })
      .catch((err) => {
        console.error("Submission Error:", err);
        const errorMsg = err.response?.data?.detail || "Failed to create request.";
        toast.error(errorMsg);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Post Blood Request</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="form-control">
          <label className="label font-semibold">Required Blood Group</label>
          <select 
            required
            className="select select-bordered"
            value={formData.blood_group}
            onChange={(e) => setFormData({...formData, blood_group: e.target.value})}
          >
            <option value="" disabled>Select Blood Group</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
        </div>

        <div className="form-control">
          <label className="label font-semibold">Bags Needed</label>
          <input 
            type="number" 
            className="input input-bordered"
            value={formData.bags_needed}
            onChange={(e) => setFormData({...formData, bags_needed: parseInt(e.target.value)})}
            required
            min="1"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">Hospital Name</label>
          <input 
            type="text" 
            className="input input-bordered"
            value={formData.hospital_name}
            onChange={(e) => setFormData({...formData, hospital_name: e.target.value})}
            required
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">Donation Date</label>
          <input 
            type="date" 
            className="input input-bordered"
            value={formData.donation_date}
            onChange={(e) => setFormData({...formData, donation_date: e.target.value})}
            required
          />
        </div>

        <button 
          type="submit" 
          className={`btn btn-block text-white border-none bg-red-600 hover:bg-red-700 ${loading ? 'btn-disabled' : ''}`}
          disabled={loading}
        >
          {loading ? <span className="loading loading-spinner"></span> : "Post Request"}
        </button>
      </form>
    </div>
  );
};

export default AddRequest;