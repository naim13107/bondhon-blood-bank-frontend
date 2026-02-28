import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import apiClient from "../../services/api-client";
import { toast } from "react-hot-toast";

const RequestEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const today = new Date().toISOString().split('T')[0];

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    // Fetch existing request data to pre-fill the form
    apiClient.get(`/requests/${id}/`)
      .then(res => {
        reset({
          blood_group: res.data.blood_group,
          hospital_name: res.data.hospital_name,
          bags_needed: res.data.bags_needed,
          donation_date: res.data.donation_date,
        });
        setLoading(false);
      })
      .catch(err => {
        toast.error("Failed to load request details.");
        navigate("/dashboard");
      });
  }, [id, reset, navigate]);

  const onSubmit = async (data) => {
    setSaving(true);
    const tokenString = localStorage.getItem("authTokens");
    const tokens = tokenString ? JSON.parse(tokenString) : null;

    try {
      // Use PATCH to partially update the request
      await apiClient.patch(`/requests/${id}/`, data, {
        headers: { Authorization: `JWT ${tokens?.access}` }
      });
      toast.success("Blood request updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to update request.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20"><span className="loading loading-spinner text-red-600 loading-lg"></span></div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Modify Blood Request</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label font-bold text-gray-700">Blood Group</label>
              <select 
                className={`select select-bordered w-full ${errors.blood_group ? 'select-error' : ''}`}
                {...register("blood_group", { required: "Required" })}
              >
                <option value="" disabled>Select Group</option>
                {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>

            <div className="form-control">
              <label className="label font-bold text-gray-700">Bags Needed</label>
              <input 
                type="number" 
                className={`input input-bordered w-full ${errors.bags_needed ? 'input-error' : ''}`} 
                {...register("bags_needed", { required: "Required", min: { value: 1, message: "At least 1 bag" } })}
              />
              {errors.bags_needed && <span className="text-red-500 text-sm mt-1">{errors.bags_needed.message}</span>}
            </div>
          </div>

          <div className="form-control">
            <label className="label font-bold text-gray-700">Hospital Name</label>
            <input 
              type="text" 
              className={`input input-bordered w-full ${errors.hospital_name ? 'input-error' : ''}`} 
              {...register("hospital_name", { required: "Hospital name is required" })}
            />
          </div>

          <div className="form-control">
            <label className="label font-bold text-gray-700">Donation Date</label>
            <input 
              type="date" 
              min={today}
              className={`input input-bordered w-full ${errors.donation_date ? 'input-error' : ''}`} 
              {...register("donation_date", { required: "Date is required" })}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => navigate("/dashboard")}
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn bg-red-600 hover:bg-red-700 text-white border-none flex-1"
              disabled={saving}
            >
              {saving ? <span className="loading loading-spinner"></span> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestEdit;