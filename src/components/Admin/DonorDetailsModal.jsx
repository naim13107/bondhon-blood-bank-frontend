import { MapPin, Calendar, Activity, Droplets } from "lucide-react";

const DonorDetailsModal = ({ donor, onClose }) => {
  if (!donor) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-base-100 rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
        >
          ✕
        </button>

        <div className="flex items-center gap-4 mb-6 border-b border-base-300 pb-4">
          <div className="bg-error/10 p-4 rounded-full text-error">
            <Droplets size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-base-content">{donor.full_name || "Unknown"}</h3>
            <span className="badge badge-error text-white font-bold">{donor.blood_group}</span>
          </div>
        </div>

        <div className="space-y-4 text-base-content">
          <div className="flex items-center gap-3">
            <Calendar className="text-base-content/40" size={20} />
            <span><strong className="text-base-content">Age:</strong> {donor.age || "N/A"} years</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-base-content/40" size={20} />
            <span><strong className="text-base-content">Location:</strong> {donor.address || "N/A"}</span>
          </div>
          <div className="flex items-center gap-3">
            <Activity className="text-base-content/40" size={20} />
            <span>
              <strong className="text-base-content">Last Donation:</strong> {donor.last_donation_date || "Never"}
            </span>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-base-300 flex justify-end">
          <button onClick={onClose} className="btn btn-neutral w-full">
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorDetailsModal;