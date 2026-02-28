import { Link } from "react-router-dom";
import { Trash2, Edit } from "lucide-react";

const AdminRequestsTab = ({ requests, onDeleteRequest }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-50 text-gray-700 text-sm">
            <tr>
              <th>ID</th>
              <th>Hospital & Date</th>
              <th>Blood & Bags</th>
              <th>Status</th>
              <th>Admin Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                <td className="font-mono text-gray-400">#{req.id}</td>
                <td>
                  <div className="font-bold text-gray-800">{req.hospital_name}</div>
                  <div className="text-sm text-gray-500">{req.donation_date}</div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-red-600">{req.blood_group}</span>
                    <span className="text-xs text-gray-500">({req.current_donors_count}/{req.bags_needed} Bags)</span>
                  </div>
                </td>
                <td>
                  {req.is_fulfilled ? (
                    <span className="badge badge-success text-white text-xs">Fulfilled</span>
                  ) : (
                    <span className="badge badge-warning text-xs">Pending</span>
                  )}
                </td>
                <td>
                  <div className="flex gap-2">
                    <Link to={`/edit-request/${req.id}`} className="btn btn-sm bg-gray-100 text-gray-700 hover:bg-gray-200 border-none">
                      <Edit size={16} /> Edit
                    </Link>
                    <button 
                      onClick={() => onDeleteRequest(req.id)}
                      className="btn btn-sm bg-red-50 text-red-600 hover:bg-red-100 border-none"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && <p className="text-center py-6 text-gray-500">No requests found.</p>}
      </div>
    </div>
  );
};

export default AdminRequestsTab;