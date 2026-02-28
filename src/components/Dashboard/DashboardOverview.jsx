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
    .then(res => {
      setData(res.data);
    })
    .catch(err => console.error("Dashboard fetch error:", err))
    .finally(() => setLoading(false));
  }, [tokens]);

  if (loading) return <div className="text-center py-20"><span className="loading loading-spinner text-red-600 loading-lg"></span></div>;
  if (!data) return <p className="text-center py-10 text-red-500">Failed to load dashboard data.</p>;

  const { summary_stats, active_dashboard, donor_profile } = data;

  return (
    <div className="space-y-8">
      {/* 1. Header Information */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800">
          Welcome back, {donor_profile?.full_name || data.user_details.email.split('@')[0]}!
        </h3>
        <p className="text-gray-500">Here is an overview of your blood donation journey.</p>
      </div>
      
      {/* 2. Summary Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-full"><Droplets className="text-red-600 w-6 h-6" /></div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Past Donations</p>
            <p className="text-2xl font-bold">{summary_stats.total_completed_donations}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full"><Activity className="text-blue-600 w-6 h-6" /></div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">My Active Requests</p>
            <p className="text-2xl font-bold">{active_dashboard.ongoing_requests.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className={`p-3 rounded-full ${summary_stats.is_available ? 'bg-green-100' : 'bg-orange-100'}`}>
            <Calendar className={`w-6 h-6 ${summary_stats.is_available ? 'text-green-600' : 'text-orange-500'}`} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Current Status</p>
            <p className={`text-xl font-bold ${summary_stats.is_available ? 'text-green-600' : 'text-orange-500'}`}>
              {summary_stats.is_available ? "Available" : "Not Available"}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Upcoming Donations (Requests the user has accepted) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
          <h4 className="font-bold text-lg text-gray-800">Upcoming Donations (You accepted)</h4>
        </div>
        <div className="p-0">
          {active_dashboard.upcoming_donations.length === 0 ? (
            <p className="p-6 text-gray-500 text-sm">You have no upcoming donations scheduled.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {active_dashboard.upcoming_donations.map(req => (
                <li key={req.id}>
                  <Link 
                    to={`/requests/${req.id}`} 
                    className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge badge-error text-white font-bold">{req.blood_group}</span>
                        <span className="font-bold text-gray-800 group-hover:text-red-600 transition-colors">{req.hospital_name}</span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                        <Calendar size={14} /> Date: <span className="font-semibold">{req.donation_date}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-1 rounded-md">
                        Bags Needed: {req.bags_needed}
                      </div>
                      <ChevronRight className="text-gray-300 group-hover:text-red-600" size={20} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 4. My Ongoing Requests (Requests the user created) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
          <h4 className="font-bold text-lg text-gray-800">My Ongoing Requests (Seeking donors)</h4>
        </div>
        <div className="p-0">
          {active_dashboard.ongoing_requests.length === 0 ? (
            <p className="p-6 text-gray-500 text-sm">You have no active blood requests.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {active_dashboard.ongoing_requests.map(req => (
                <li key={req.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-gray-50 transition-colors">
                  
                  {/* Info Section - No longer a Link wrapper */}
                  <div className="flex-1 w-full text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-black text-red-600">{req.blood_group}</span>
                      {req.is_fulfilled ? (
                         <span className="badge badge-success text-white text-xs">Fulfilled</span>
                      ) : (
                         <span className="badge badge-warning text-xs">Pending</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="flex items-center gap-1 font-bold text-gray-800">
                        <MapPin size={14}/> {req.hospital_name}
                      </p>
                      <p className="flex items-center gap-1"><Calendar size={14}/> {req.donation_date}</p>
                    </div>
                  </div>
                  
                  {/* Stats & Actions Section */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="bg-red-50 text-red-700 rounded-lg p-3 inline-block w-full sm:w-auto text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Users size={16} />
                        <span className="font-bold">Donors Found</span>
                      </div>
                      <span className="text-xl font-black">{req.current_donors_count}</span>
                      <span className="text-sm font-medium"> / {req.bags_needed}</span>
                    </div>
                    
                    {/* Independent Action Buttons */}
                    <div className="flex sm:flex-col gap-2 w-full sm:w-28 mt-2 sm:mt-0">
                      <Link to={`/requests/${req.id}`} className="btn btn-sm btn-outline w-full flex-1">
                        View Details
                      </Link>
                      {/* Only allow editing if the request is not yet fulfilled */}
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