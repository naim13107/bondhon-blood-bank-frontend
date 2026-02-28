import { useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../services/api-client";
import { toast } from "react-hot-toast";

const DonorProfileForm = ({ donorProfile, tokens }) => {
  const [saving, setSaving] = useState(false);
  const [profileId, setProfileId] = useState(donorProfile?.id || null);
  const [isAvailable, setIsAvailable] = useState(donorProfile?.is_available || false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const today = new Date().toISOString().split('T')[0];

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      age: donorProfile?.age || "",
      blood_group: donorProfile?.blood_group || "",
      last_donation_date: donorProfile?.last_donation_date || ""
    }
  });

  const onSubmit = async (data) => {
    setSaving(true);
    const payload = {
      ...data,
      last_donation_date: data.last_donation_date ? data.last_donation_date : null
    };

    try {
      if (profileId) {
        await apiClient.put(`/donors/${profileId}/`, payload, {
          headers: { Authorization: `JWT ${tokens?.access}` }
        });
        toast.success("Donor profile updated successfully!");
      } else {
        const response = await apiClient.post(`/donors/`, payload, {
          headers: { Authorization: `JWT ${tokens?.access}` }
        });
        setProfileId(response.data.id); 
        setIsAvailable(response.data.is_available);
        toast.success("Donor profile created successfully!");
      }
    } catch (error) {
      console.error("Donor save failed:", error);
      const errData = error.response?.data;
      let errorMsg = "Failed to save donor profile.";
      
      if (errData) {
        if (errData.last_donation_date) errorMsg = errData.last_donation_date[0] || errData.last_donation_date;
        else if (errData.detail) errorMsg = errData.detail;
        else if (typeof errData === 'object') errorMsg = Object.values(errData).flat().join(' ');
      }
      toast.error(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Donor Profile</h3>
        {profileId && (
          <div className={`badge ${isAvailable ? 'badge-success text-white' : 'badge-warning'} font-bold`}>
            {isAvailable ? "Available" : "Cooldown Period"}
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label font-bold text-gray-700">Age *</label>
            <input 
              type="number" 
              className="input input-bordered w-full" 
              {...register("age", { required: "Age is required", min: { value: 18, message: "Must be at least 18" } })}
            />
            {errors.age && <span className="text-red-500 text-sm mt-1">{errors.age.message}</span>}
          </div>

          <div className="form-control">
            <label className="label font-bold text-gray-700">Blood Group *</label>
            <select 
              className="select select-bordered w-full"
              {...register("blood_group", { required: "Blood group is required" })}
            >
              <option value="" disabled>Select Group</option>
              {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
            {errors.blood_group && <span className="text-red-500 text-sm mt-1">{errors.blood_group.message}</span>}
          </div>
        </div>

        <div className="form-control">
          <label className="label font-bold text-gray-700">Last Donation Date</label>
          <input 
            type="date" 
            max={today}
            className={`input input-bordered w-full ${errors.last_donation_date ? 'input-error' : ''}`} 
            {...register("last_donation_date", {
              validate: value => !value || value <= today || "Date cannot be in the future"
            })}
          />
          {errors.last_donation_date && <span className="text-red-500 text-sm mt-1">{errors.last_donation_date.message}</span>}
          <p className="text-sm text-gray-500 mt-2">Leave blank if you have never donated before.</p>
        </div>

        <button 
          type="submit" 
          className={`btn bg-red-600 hover:bg-red-700 text-white border-none w-full mt-4 ${saving ? 'btn-disabled' : ''}`}
          disabled={saving}
        >
          {saving ? <span className="loading loading-spinner"></span> : "Save Donor Profile"}
        </button>
      </form>
    </div>
  );
};

export default DonorProfileForm;