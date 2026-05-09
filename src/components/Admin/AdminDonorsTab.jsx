import React from 'react';
import { Trash2, Eye, Calendar } from 'lucide-react';

const AdminDonorsTab = ({ donors, onViewDonor, onDeleteUser }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead className="bg-base-200 text-base-content/70">
          <tr>
            <th>User / Email</th>
            <th>Blood Group</th>
            <th>Joined Date</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor) => (
            <tr key={donor.id} className="hover:bg-base-200/50 border-b border-base-300">
              <td>
                <div className="font-bold text-base-content">{donor.user_details?.full_name || "N/A"}</div>
                <div className="text-sm opacity-50">{donor.user_details?.email}</div>
              </td>
              <td>
                <span className="badge badge-error text-white font-bold">{donor.blood_group}</span>
              </td>
              <td>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={14} />
                  {new Date(donor.user_details?.date_joined).toLocaleDateString()}
                </div>
              </td>
              <td>
                {donor.is_available ? (
                  <span className="badge badge-success badge-outline">Available</span>
                ) : (
                  <span className="badge badge-ghost">Unavailable</span>
                )}
              </td>
              <td className="flex justify-center gap-2">
                <button 
                  onClick={() => onViewDonor(donor)}
                  className="btn btn-square btn-ghost btn-sm text-info"
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => onDeleteUser(donor.user)}
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

export default AdminDonorsTab;