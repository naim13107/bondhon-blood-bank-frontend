import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useFetchAdminDashboard from "../hooks/useFetchAdminDashboard";
import { Users, Activity, BarChart3, ShieldCheck } from "lucide-react";

import AdminDonorsTab from "../components/Admin/AdminDonorsTab";
import AdminRequestsTab from "../components/Admin/AdminRequestsTab";
import DonorDetailsModal from "../components/Admin/DonorDetailsModal";

const AdminDashboard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { donors, requests, stats, loading, deleteRequest, deleteUser } = useFetchAdminDashboard(user, navigate);

  const [activeTab, setActiveTab] = useState("donors");
  const [selectedDonor, setSelectedDonor] = useState(null);

  if (loading) return <div className="text-center py-20"><span className="loading loading-spinner text-error loading-lg"></span></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-base-100">
      <h1 className="text-3xl font-black mb-8 flex items-center gap-2">
        <ShieldCheck className="text-error" size={32} /> Admin Panel
      </h1>

      {/* Stats Section */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-base-content">
          <div className="stat bg-base-200 rounded-xl shadow">
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">{stats.total_users}</div>
          </div>
          <div className="stat bg-base-200 rounded-xl shadow">
            <div className="stat-title">Requests</div>
            <div className="stat-value text-error">{stats.total_requests}</div>
          </div>
        </div>
      )}

      <div className="tabs tabs-boxed mb-6">
        <button className={`tab ${activeTab === 'donors' ? 'tab-active bg-error text-white' : ''}`} onClick={() => setActiveTab('donors')}>Donors</button>
        <button className={`tab ${activeTab === 'requests' ? 'tab-active bg-error text-white' : ''}`} onClick={() => setActiveTab('requests')}>Requests</button>
      </div>

      <div className="bg-base-100 rounded-xl border border-base-300">
        {activeTab === 'donors' ? (
          <AdminDonorsTab donors={donors} onViewDonor={setSelectedDonor} onDeleteUser={deleteUser} />
        ) : (
          <AdminRequestsTab requests={requests} onDeleteRequest={deleteRequest} />
        )}
      </div>

      <DonorDetailsModal donor={selectedDonor} onClose={() => setSelectedDonor(null)} />
    </div>
  );
};

export default AdminDashboard;