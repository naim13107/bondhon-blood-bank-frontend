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
  
  // Custom Hook handles data fetching and delete actions
  const { donors, requests, loading, deleteRequest } = useFetchAdminDashboard(user, navigate);
  
  // Local UI State
  const [activeTab, setActiveTab] = useState("donors");
  const [selectedDonor, setSelectedDonor] = useState(null);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner text-red-600 loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Admin Control Panel</h1>
        <p className="text-gray-500">Manage all platform data, donors, and emergency requests.</p>
      </div>

      {/* Admin Tabs */}
      <div className="tabs tabs-boxed bg-gray-50 p-2 mb-8 inline-flex">
        <button 
          className={`tab px-8 py-2 font-bold text-lg h-auto ${activeTab === 'donors' ? 'tab-active bg-red-600 text-white rounded-lg' : 'text-gray-500'}`}
          onClick={() => setActiveTab('donors')}
        >
          <Users className="w-5 h-5 mr-2 inline" /> Donors Directory
        </button>
        <button 
          className={`tab px-8 py-2 font-bold text-lg h-auto ${activeTab === 'requests' ? 'tab-active bg-red-600 text-white rounded-lg' : 'text-gray-500'}`}
          onClick={() => setActiveTab('requests')}
        >
          <Activity className="w-5 h-5 mr-2 inline" /> Manage Requests
        </button>
      </div>

      {/* Render Active Tab Component */}
      {activeTab === 'donors' ? (
        <AdminDonorsTab donors={donors} onViewDonor={setSelectedDonor} />
      ) : (
        <AdminRequestsTab requests={requests} onDeleteRequest={deleteRequest} />
      )}

      {/* Render Modal Overlay */}
      <DonorDetailsModal donor={selectedDonor} onClose={() => setSelectedDonor(null)} />
    </div>
  );
};

export default AdminDashboard;