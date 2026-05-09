import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../services/api-client";
import { Activity, Droplets, Calendar, MapPin, Users, ChevronRight, Edit } from "lucide-react";

const DashboardOverview = ({ tokens }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/dashboard/", {
      headers: { Authorization: `JWT ${tokens?.access}` }
    })
    .then(res => setData(res.data))
    .catch(err => console.error("Dashboard fetch error:", err))
    .finally(() => setLoading(false));
  }, [tokens]);

  if (loading) return <div className="text-center py-20"><span className="loading loading-spinner text-error loading-lg"></span></div>;
  if (!data) return <p className="text-center py-10 text-error">Failed to load dashboard data.</p>;

  const { summary_stats, active_dashboard, donor_profile } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-base-content">
          Welcome back, {donor_profile?.full_name || data.user_details.email.split('@')[0]}!
        </h3>
        <p className="text-base-content/50">Here is an overview of your blood donation journey.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-300 flex items-center space-x-4">
          <div className="bg-error/10 p-3 rounded-full"><Droplets className="text-error w-6 h-6" /></div>
          <div>
            <p className="text-sm text-base-content/50 font-semibold">Past Donations</p>
            <p className="text-2xl font-bold text-base-content">{summary_stats.total_completed_donations}</p>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-300 flex items-center space-x-4">
          <div className="bg-info/10 p-3 rounded-full"><Activity className="text-info w-6 h-6" /></div>
          <div>
            <p className="text-sm text-base-content/50 font-semibold">My Active Requests</p>
            <p className="text-2xl font-bold text-base-content">{active_dashboard.ongoing_requests.length}</p>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-300 flex items-center space-x-4">
          <div className={`p-3 rounded-full ${summary_stats.is_available ? 'bg-success/10' : 'bg-warning/10'}`}>
            <Calendar className={`w-6 h-6 ${summary_stats.is_available ? 'text-success' : 'text-warning'}`} />
          </div>
          <div>
            <p className="text-sm text-base-content/50 font-semibold">Current Status</p>
            <p className={`text-xl font-bold ${summary_stats.is_available ? 'text-success' : 'text-warning'}`}>
              {summary_stats.is_available ? "Available" : "Not Available"}
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Donations */}
      <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden">
        <div className="bg-base-200 px-6 py-4 border-b border-base-300">
          <h4 className="font-bold text-lg text-base-content">Upcoming Donations (You accepted)</h4>
        </div>
        <div className="p-0">
          {active_dashboard.upcoming_donations.length === 0 ? (
            <p className="p-6 text-base-content/50 text-sm">You have no upcoming donations scheduled.</p>
          ) : (
            <ul className="divide-y divide-base-300">
              {active_dashboard.upcoming_donations.map(req => (
                <li key={req.id}>
                  <Link
                    to={`/requests/${req.id}`}
                    className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-base-200 transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge badge-error text-white font-bold">{req.blood_group}</span>
                        <span className="font-bold text-base-content group-hover:text-error transition-colors">{req.hospital_name}</span>
                      </div>
                      <p className="text-sm text-base-content/50 flex items-center gap-1 mt-2">
                        <Calendar size={14} /> Date: <span className="font-semibold">{req.donation_date}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-semibold text-base-content/60 bg-base-200 px-3 py-1 rounded-md">
                        Bags Needed: {req.bags_needed}
                      </div>
                      <ChevronRight className="text-base-content/30 group-hover:text-error" size={20} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* My Ongoing Requests */}
      <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden">
        <div className="bg-base-200 px-6 py-4 border-b border-base-300">
          <h4 className="font-bold text-lg text-base-content">My Ongoing Requests (Seeking donors)</h4>
        </div>
        <div className="p-0">
          {active_dashboard.ongoing_requests.length === 0 ? (
            <p className="p-6 text-base-content/50 text-sm">You have no active blood requests.</p>
          ) : (
            <ul className="divide-y divide-base-300">
              {active_dashboard.ongoing_requests.map(req => (
                <li key={req.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-base-200 transition-colors">
                  <div className="flex-1 w-full text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-black text-error">{req.blood_group}</span>
                      {req.is_fulfilled ? (
                        <span className="badge badge-success text-white text-xs">Fulfilled</span>
                      ) : (
                        <span className="badge badge-warning text-xs">Pending</span>
                      )}
                    </div>
                    <div className="text-sm text-base-content/60 space-y-1">
                      <p className="flex items-center gap-1 font-bold text-base-content">
                        <MapPin size={14} /> {req.hospital_name}
                      </p>
                      <p className="flex items-center gap-1"><Calendar size={14} /> {req.donation_date}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="bg-error/10 text-error rounded-lg p-3 inline-block w-full sm:w-auto text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Users size={16} />
                        <span className="font-bold">Donors Found</span>
                      </div>
                      <span className="text-xl font-black">{req.current_donors_count}</span>
                      <span className="text-sm font-medium"> / {req.bags_needed}</span>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full sm:w-28 mt-2 sm:mt-0">
                      <Link to={`/requests/${req.id}`} className="btn btn-sm btn-outline w-full flex-1">
                        View Details
                      </Link>
                      {!req.is_fulfilled && (
                        <Link to={`/edit-request/${req.id}`} className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none w-full flex-1 gap-1">
                          <Edit size={14} /> Edit
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;