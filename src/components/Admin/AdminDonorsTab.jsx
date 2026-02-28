import { Eye } from "lucide-react";

const AdminDonorsTab = ({ donors, onViewDonor }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-50 text-gray-700 text-sm">
            <tr>
              <th>ID</th>
              <th>Donor Name</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donors.map(donor => (
              <tr key={donor.id} className="hover:bg-gray-50 transition-colors">
                <td className="font-mono text-gray-400">#{donor.id}</td>
                <td className="font-bold">{donor.full_name || `User ${donor.user}`}</td>
                <td><span className="badge badge-error text-white font-bold">{donor.blood_group}</span></td>
                <td>
                  {donor.is_available ? (
                    <span className="text-green-600 font-semibold text-sm">Available</span>
                  ) : (
                    <span className="text-orange-500 font-semibold text-sm">On Cooldown</span>
                  )}
                </td>
                <td>
                  <button 
                    onClick={() => onViewDonor(donor)}
                    className="btn btn-sm btn-outline bg-blue-50 text-blue-600 border-none hover:bg-blue-100"
                  >
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {donors.length === 0 && <p className="text-center py-6 text-gray-500">No donors found.</p>}
      </div>
    </div>
  );
};

export default AdminDonorsTab;