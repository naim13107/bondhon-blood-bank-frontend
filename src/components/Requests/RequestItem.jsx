import { MapPin, Calendar, Droplets, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
import apiClient from '../../services/api-client';
import { toast } from 'react-hot-toast';

const RequestItem = ({ request, currentUserId, onRefresh }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // FIX: Check the 'donors' array for the user's ID, not their email
  const hasDonated = request.donors?.includes(currentUserId);

  const handleDonationToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to donate blood.");
      navigate("/login");
      return;
    }

    setLoading(true);
    const tokenString = localStorage.getItem("authTokens");
    const tokens = tokenString ? JSON.parse(tokenString) : null;
    const config = { headers: { Authorization: `JWT ${tokens?.access}` } };

    try {
      const endpoint = hasDonated ? 'withdraw' : 'accept';
      await apiClient.post(`/requests/${request.id}/${endpoint}/`, {}, config);
      
      toast.success(hasDonated ? "Withdrawn successfully" : "Accepted successfully!");
      
      // FIX: Seamlessly update the UI without refreshing the whole page
      onRefresh(); 
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Action failed.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <Link to={`/requests/${request.id}`} className="flex flex-col flex-1">
        <div className="bg-red-50 p-4 border-b border-red-100 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Droplets className="h-6 w-6 text-red-600" />
            <span className="text-2xl font-black text-red-700">{request.blood_group}</span>
          </div>
          {request.is_fulfilled ? (
            <span className="badge badge-success text-white font-bold">Fulfilled</span>
          ) : (
            <span className="badge badge-error text-white font-bold">Urgent</span>
          )}
        </div>

        <div className="p-6 flex-1 space-y-4">
          <div className="flex items-start space-x-3 text-gray-700">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="font-medium">{request.hospital_name}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <span className="text-sm">Needed: <span className="font-bold">{request.donation_date}</span></span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <Users className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <span className="text-sm">Donors: <span className="font-bold text-red-600">{request.donors?.length || 0}</span> / {request.bags_needed}</span>
          </div>
        </div>
      </Link>

      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <button 
          onClick={handleDonationToggle}
          disabled={loading || (request.is_fulfilled && !hasDonated)}
          className={`btn btn-block text-white border-none ${
            hasDonated ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : hasDonated ? (
            "Withdraw Donation"
          ) : (
            "Donate Now"
          )}
        </button>
      </div>
    </div>
  );
};

export default RequestItem;