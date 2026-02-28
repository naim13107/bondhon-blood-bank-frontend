import { MapPin, Calendar, Activity, Droplets } from "lucide-react";

const DonorDetailsModal = ({ donor, onClose }) => {
  if (!donor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
        >
          ✕
        </button>
        
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
          <div className="bg-red-100 p-4 rounded-full text-red-600">
            <Droplets size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{donor.full_name || "Unknown"}</h3>
            <span className="badge badge-error text-white font-bold">{donor.blood_group}</span>
          </div>
        </div>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <Calendar className="text-gray-400" size={20} />
            <span><strong className="text-gray-900">Age:</strong> {donor.age || "N/A"} years</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-gray-400" size={20} />
            <span><strong className="text-gray-900">Location:</strong> {donor.address || "N/A"}</span>
          </div>
          <div className="flex items-center gap-3">
            <Activity className="text-gray-400" size={20} />
            <span>
              <strong className="text-gray-900">Last Donation:</strong> {donor.last_donation_date || "Never"}
            </span>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
          <button onClick={onClose} className="btn bg-gray-900 hover:bg-gray-800 text-white border-none w-full">
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorDetailsModal;