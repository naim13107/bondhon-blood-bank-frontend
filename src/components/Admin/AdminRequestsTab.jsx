import React from 'react';
import { Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminRequestsTab = ({ requests, onDeleteRequest }) => {
  return (
    <div className="overflow-x-auto bg-[#0f172a] rounded-xl p-2"> 
      <table className="table w-full border-separate border-spacing-y-3">
        {/* Table Head */}
        <thead className="text-slate-500 text-sm font-semibold">
          <tr>
            <th className="bg-transparent border-none">ID</th>
            <th className="bg-transparent border-none">Hospital / Recipient</th>
            <th className="bg-transparent border-none text-center">Blood Group</th>
            <th className="bg-transparent border-none">Status</th>
            <th className="bg-transparent border-none text-center">Action</th>
          </tr>
        </thead>
        
        {/* Table Body */}
        <tbody className="text-slate-200">
          {requests.map((req, index) => (
            <tr key={req.id} className="bg-[#1e293b] hover:bg-[#334155] transition-all group">
              <td className="rounded-l-xl border-none text-slate-500">
                #{index + 1}
              </td>
              <td className="border-none">
                <div className="font-bold text-white group-hover:text-red-400 transition-colors">
                  {req.hospital_name}
                </div>
                <div className="text-xs text-slate-400">{req.recipient_email}</div>
              </td>
              <td className="border-none text-center">
                <span className="bg-red-500/20 text-red-400 px-4 py-1.5 rounded-lg font-black text-sm border border-red-500/30">
                  {req.blood_group}
                </span>
              </td>
              <td className="border-none">
                {req.is_fulfilled ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Fulfilled
                  </span>
                ) : (
                  <span className="text-amber-400 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Pending
                  </span>
                )}
              </td>
              <td className="rounded-r-xl border-none">
                <div className="flex justify-center items-center gap-3">
                  <Link 
                    to={`/requests/${req.id}`} 
                    className="btn btn-sm btn-outline border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white gap-2 normal-case"
                  >
                    <Eye size={16} /> View
                  </Link>
                  <button 
                    onClick={() => onDeleteRequest(req.id)}
                    className="btn btn-sm btn-outline border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white gap-2 normal-case"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {requests.length === 0 && (
        <div className="text-center py-20 text-slate-500 italic">
          No blood requests currently in the system.
        </div>
      )}
    </div>
  );
};

export default AdminRequestsTab;