import { Eye } from "lucide-react";

const AdminDonorsTab = ({ donors, onViewDonor }) => {
  return (
    <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200 text-base-content text-sm">
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
              <tr key={donor.id} className="hover:bg-base-200 transition-colors">
                <td className="font-mono text-base-content/40">#{donor.id}</td>
                <td className="font-bold text-base-content">{donor.full_name || `User ${donor.user}`}</td>
                <td><span className="badge badge-error text-white font-bold">{donor.blood_group}</span></td>
                <td>
                  {donor.is_available ? (
                    <span className="text-success font-semibold text-sm">Available</span>
                  ) : (
                    <span className="text-warning font-semibold text-sm">On Cooldown</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => onViewDonor(donor)}
                    className="btn btn-sm btn-outline btn-info"
                  >
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {donors.length === 0 && <p className="text-center py-6 text-base-content/50">No donors found.</p>}
      </div>
    </div>
  );
};

export default AdminDonorsTab;