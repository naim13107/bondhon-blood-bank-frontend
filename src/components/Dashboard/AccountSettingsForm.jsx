import { useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../services/api-client";
import { toast } from "react-hot-toast";

const AccountSettingsForm = ({ userDetails, tokens }) => {
  const [saving, setSaving] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: userDetails?.email || "",
      first_name: userDetails?.first_name || "",
      last_name: userDetails?.last_name || "",
      address: userDetails?.address || "",
      phone_number: userDetails?.phone_number || ""
    }
  });

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_number: data.phone_number
      };

      await apiClient.put(`/auth/users/me/`, payload, {
        headers: { Authorization: `JWT ${tokens?.access}` }
      });
      toast.success("Account settings updated successfully!");
    } catch (error) {
      console.error("User update failed:", error);
      toast.error("Failed to update account settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="form-control">
          <label className="label font-bold text-gray-700">Email Address</label>
          <input 
            type="email" 
            className="input input-bordered w-full bg-gray-50 text-gray-500" 
            readOnly
            {...register("email")}
          />
          <p className="text-xs text-gray-400 mt-1">Email cannot be changed directly for security reasons.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label font-bold text-gray-700">First Name</label>
            <input 
              type="text" 
              className={`input input-bordered w-full ${errors.first_name ? 'input-error' : ''}`} 
              {...register("first_name", { required: "First name is required" })}
            />
            {errors.first_name && <span className="text-red-500 text-sm mt-1">{errors.first_name.message}</span>}
          </div>

          <div className="form-control">
            <label className="label font-bold text-gray-700">Last Name</label>
            <input 
              type="text" 
              className={`input input-bordered w-full ${errors.last_name ? 'input-error' : ''}`} 
              {...register("last_name", { required: "Last name is required" })}
            />
            {errors.last_name && <span className="text-red-500 text-sm mt-1">{errors.last_name.message}</span>}
          </div>
        </div>

        <div className="form-control">
          <label className="label font-bold text-gray-700">Address</label>
          <input 
            type="text" 
            className="input input-bordered w-full" 
            {...register("address")}
            placeholder="e.g., Adabor, Dhaka"
          />
        </div>

        <div className="form-control">
          <label className="label font-bold text-gray-700">Phone Number</label>
          <input 
            type="text" 
            className="input input-bordered w-full" 
            {...register("phone_number")}
            placeholder="e.g., 01728906794"
          />
        </div>

        {/* Updated Button Styling */}
        <button 
          type="submit" 
          className="btn bg-red-600 hover:bg-red-700 text-white font-bold border-none w-full mt-4"
          disabled={saving}
        >
          {saving ? <span className="loading loading-spinner"></span> : "Update Account"}
        </button>
      </form>
    </div>
  );
};

export default AccountSettingsForm;