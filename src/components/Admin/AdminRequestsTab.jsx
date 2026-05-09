import React from 'react';
import { Trash2, ExternalLink, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminRequestsTab = ({ requests, onDeleteRequest }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead className="bg-base-200 text-base-content/70">
          <tr>
            <th>Group / Hospital</th>
            <th>Recipient</th>
            <th>Donation Date</th>
            <th>Progress</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="hover:bg-base-200/50 border-b border-base-300">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-error text-white rounded-lg w-10">
                      <span className="font-bold">{req.blood_group}</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold flex items-center gap-1">
                      {req.hospital_name}
                    </div>
                    <div className="text-xs opacity-50 flex items-center gap-1">
                      <MapPin size={10} /> {req.address || "Location N/A"}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="text-sm font-medium">{req.recipient_email}</div>
              </td>
              <td>{req.donation_date}</td>
              <td>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold">
                    {req.current_donors_count} / {req.bags_needed} Bags
                  </span>
                  <progress 
                    className={`progress w-20 ${req.is_fulfilled ? 'progress-success' : 'progress-error'}`} 
                    value={req.current_donors_count} 
                    max={req.bags_needed}
                  ></progress>
                </div>
              </td>
              <td className="flex justify-center gap-2">
                <Link to={`/requests/${req.id}`} className="btn btn-square btn-ghost btn-sm text-primary">
                  <ExternalLink size={18} />
                </Link>
                <button 
                  onClick={() => onDeleteRequest(req.id)}
                  className="btn btn-square btn-ghost btn-sm text-error"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequestsTab;