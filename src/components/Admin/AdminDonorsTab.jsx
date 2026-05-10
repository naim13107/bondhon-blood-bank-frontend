import React from 'react';
import { Trash2, Eye } from 'lucide-react';

const AdminDonorsTab = ({ donors, onViewDonor, onDeleteUser }) => {
  return (
    <div className="overflow-x-auto bg-[#0f172a] rounded-xl p-2"> 
      <table className="table w-full border-separate border-spacing-y-3">
        <thead className="text-slate-500 text-sm font-semibold">
          <tr>
            <th className="bg-transparent border-none">ID</th>
            <th className="bg-transparent border-none">Donor Name</th>
            <th className="bg-transparent border-none text-center">Blood Group</th>
            <th className="bg-transparent border-none">Status</th>
            <th className="bg-transparent border-none text-center">Action</th>
          </tr>
        </thead>
        
        <tbody className="text-slate-200">
          {donors.map((donor, index) => {
          
            const displayName = donor.full_name || donor.user_details?.full_name || "Unknown User";
            const displayEmail = donor.email || donor.user_details?.email || "No email provided";

            return (
              <tr key={donor.id} className="bg-[#1e293b] hover:bg-[#334155] transition-all group">
                <td className="rounded-l-xl border-none text-slate-500">
                  #{index + 1}
                </td>
                <td className="border-none">
                  <div className="font-bold text-white group-hover:text-red-400 transition-colors">
                    {displayName}
                  </div>
                  <div className="text-xs text-slate-400">{displayEmail}</div>
                </td>
                <td className="border-none text-center">
                  <span className="bg-red-500/20 text-red-400 px-4 py-1.5 rounded-lg font-black text-sm border border-red-500/30">
                    {donor.blood_group}
                  </span>
                </td>
                <td className="border-none">
                  {donor.is_available ? (
                    <span className="text-emerald-400 font-bold">Available</span>
                  ) : (
                    <span className="text-amber-500 font-bold">On Cooldown</span>
                  )}
                </td>
                <td className="rounded-r-xl border-none">
                  <div className="flex justify-center items-center gap-3">
                    <button 
                      onClick={() => onViewDonor(donor)}
                      className="btn btn-sm btn-outline border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white gap-2 normal-case"
                    >
                      <Eye size={16} /> View
                    </button>
                    <button 
                      onClick={() => onDeleteUser(donor.user || donor.id)}
                      className="btn btn-sm btn-outline border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white gap-2 normal-case"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDonorsTab;