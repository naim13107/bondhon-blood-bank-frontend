import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useFetchAdminDashboard from "../hooks/useFetchAdminDashboard";
import { Users, Activity } from "lucide-react";

import AdminDonorsTab from "../components/Admin/AdminDonorsTab";
import AdminRequestsTab from "../components/Admin/AdminRequestsTab";
import DonorDetailsModal from "../components/Admin/DonorDetailsModal";

import { Users, Activity, BarChart3, ShieldCheck } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { donors, requests, stats, loading, deleteRequest, deleteUser } = useFetchAdminDashboard(user, navigate);

  const [activeTab, setActiveTab] = useState("donors");
  const [selectedDonor, setSelectedDonor] = useState(null);

  if (loading) return <div className="text-center py-20"><span className="loading loading-spinner text-error loading-lg"></span></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-base-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-base-content">Admin Control Panel</h1>
        <p className="text-base-content/60">Platform-wide overview and data management.</p>
      </div>

      {/* Global Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="stats shadow bg-base-100 border border-base-300">
            <div className="stat">
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-primary text-2xl">{stats.total_users}</div>
            </div>
          </div>
          <div className="stats shadow bg-base-100 border border-base-300">
            <div className="stat">
              <div className="stat-title">Total Requests</div>
              <div className="stat-value text-error text-2xl">{stats.total_requests}</div>
            </div>
          </div>
          <div className="stats shadow bg-base-100 border border-base-300">
            <div className="stat">
              <div className="stat-title">Active Now</div>
              <div className="stat-value text-warning text-2xl">{stats.active_requests}</div>
            </div>
          </div>
          <div className="stats shadow bg-base-100 border border-base-300">
            <div className="stat">
              <div className="stat-title">Fulfilled</div>
              <div className="stat-value text-success text-2xl">{stats.fulfilled_requests}</div>
            </div>
          </div>
        </div>
      )}

      <div className="tabs tabs-boxed bg-base-200 p-2 mb-8 inline-flex">
        <button
          className={`tab px-8 py-2 font-bold transition-all ${activeTab === 'donors' ? 'tab-active bg-red-600 text-white' : ''}`}
          onClick={() => setActiveTab('donors')}
        >
          <Users className="w-5 h-5 mr-2 inline" /> Donors ({donors.length})
        </button>
        <button
          className={`tab px-8 py-2 font-bold transition-all ${activeTab === 'requests' ? 'tab-active bg-red-600 text-white' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <Activity className="w-5 h-5 mr-2 inline" /> Requests ({requests.length})
        </button>
      </div>

      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
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