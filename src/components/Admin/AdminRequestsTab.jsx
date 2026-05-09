import { Link } from "react-router-dom";
import { Trash2, Edit } from "lucide-react";

const AdminRequestsTab = ({ requests, onDeleteRequest }) => {
  return (
    <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200 text-base-content text-sm">
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
              <tr key={req.id} className="hover:bg-base-200 transition-colors">
                <td className="font-mono text-base-content/40">#{req.id}</td>
                <td>
                  <div className="font-bold text-base-content">{req.hospital_name}</div>
                  <div className="text-sm text-base-content/50">{req.donation_date}</div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-error">{req.blood_group}</span>
                    <span className="text-xs text-base-content/50">({req.current_donors_count}/{req.bags_needed} Bags)</span>
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
                    <Link to={`/edit-request/${req.id}`} className="btn btn-sm btn-outline">
                      <Edit size={16} /> Edit
                    </Link>
                    <button
                      onClick={() => onDeleteRequest(req.id)}
                      className="btn btn-sm btn-error btn-outline"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && <p className="text-center py-6 text-base-content/50">No requests found.</p>}
      </div>
    </div>
  );
};

export default AdminRequestsTab;