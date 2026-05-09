import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useFetchAdminDashboard from "../hooks/useFetchAdminDashboard";
import { Users, Activity } from "lucide-react";

import AdminDonorsTab from "../components/Admin/AdminDonorsTab";
import AdminRequestsTab from "../components/Admin/AdminRequestsTab";
import DonorDetailsModal from "../components/Admin/DonorDetailsModal";

const AdminDashboard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { donors, requests, loading, deleteRequest, deleteUser } = useFetchAdminDashboard(user, navigate); // ← added deleteUser

  const [activeTab, setActiveTab] = useState("donors");
  const [selectedDonor, setSelectedDonor] = useState(null);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner text-error loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-base-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-base-content">Admin Control Panel</h1>
        <p className="text-base-content/60">Manage all platform data, donors, and emergency requests.</p>
      </div>

      <div className="tabs tabs-boxed bg-base-200 p-2 mb-8 inline-flex">
        <button
          className={`tab px-8 py-2 font-bold text-lg h-auto transition-all ${activeTab === 'donors' ? 'tab-active bg-red-600 text-white rounded-lg shadow-md' : 'text-base-content/50 hover:text-base-content'}`}
          onClick={() => setActiveTab('donors')}
        >
          <Users className="w-5 h-5 mr-2 inline" /> Donors Directory
        </button>
        <button
          className={`tab px-8 py-2 font-bold text-lg h-auto transition-all ${activeTab === 'requests' ? 'tab-active bg-red-600 text-white rounded-lg shadow-md' : 'text-base-content/50 hover:text-base-content'}`}
          onClick={() => setActiveTab('requests')}
        >
          <Activity className="w-5 h-5 mr-2 inline" /> Manage Requests
        </button>
      </div>

      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
        {activeTab === 'donors' ? (
          <AdminDonorsTab donors={donors} onViewDonor={setSelectedDonor} onDeleteUser={deleteUser} /> // ← added onDeleteUser
        ) : (
          <AdminRequestsTab requests={requests} onDeleteRequest={deleteRequest} />
        )}
      </div>

      <DonorDetailsModal donor={selectedDonor} onClose={() => setSelectedDonor(null)} />
    </div>
  );
};

export default AdminDashboard;