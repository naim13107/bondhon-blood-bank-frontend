import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import AccountSettingsForm from "./AccountSettingsForm";
import DonorProfileForm from "./DonorProfileForm";

const ProfileSettings = ({ tokens }) => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    apiClient.get(`/dashboard/`, {
      headers: { Authorization: `JWT ${tokens?.access}` }
    })
    .then(res => setDashboardData(res.data))
    .catch(err => console.error("Profile fetch error:", err))
    .finally(() => setLoading(false));
  }, [tokens]);

  if (loading) return <div className="text-center py-10"><span className="loading loading-spinner text-red-600"></span></div>;

  return (
    <div className="space-y-8 max-w-2xl">
      <AccountSettingsForm 
        userDetails={dashboardData?.user_details} 
        tokens={tokens} 
      />
      <DonorProfileForm 
        donorProfile={dashboardData?.donor_profile} 
        tokens={tokens} 
      />
    </div>
  );
};

export default ProfileSettings;