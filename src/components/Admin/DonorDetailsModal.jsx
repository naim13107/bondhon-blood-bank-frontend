import { MapPin, Calendar, Activity, Droplets, Mail } from "lucide-react";

const DonorDetailsModal = ({ donor, onClose }) => {
  if (!donor) return null;

  
  const fullName = donor.user_details?.full_name || donor.full_name || "Unknown User";
  const email = donor.user_details?.email || "No email provided";

  return (
    <div className="fixed inset-0 bg-black/60 z- flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-base-100 rounded-2xl max-w-md w-full p-8 relative shadow-2xl border border-base-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
        >
          ✕
        </button>

        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6 border-b border-base-300 pb-4">
          <div className="bg-error/10 p-4 rounded-full text-error shadow-inner">
            <Droplets size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-base-content leading-tight">{fullName}</h3>
            <div className="flex gap-2 mt-1">
              <span className="badge badge-error text-white font-bold">{donor.blood_group}</span>
              {donor.is_available ? (
                <span className="badge badge-success badge-outline text-xs">Available</span>
              ) : (
                <span className="badge badge-ghost text-xs">Unavailable</span>
              )}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-base-content/80">
            <Mail className="text-error/60" size={20} />
            <span className="text-sm truncate">
              <strong className="text-base-content">Email:</strong> {email}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-base-content/80">
            <Calendar className="text-error/60" size={20} />
            <span className="text-sm">
              <strong className="text-base-content">Age:</strong> {donor.age || "N/A"} years
            </span>
          </div>

          <div className="flex items-center gap-3 text-base-content/80">
            <MapPin className="text-error/60" size={20} />
            <span className="text-sm">
              <strong className="text-base-content">Location:</strong> {donor.address || "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-base-content/80">
            <Activity className="text-error/60" size={20} />
            <span className="text-sm">
              <strong className="text-base-content">Last Donation:</strong> {donor.last_donation_date || "First-time donor"}
            </span>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-8 pt-4 border-t border-base-300">
          <button 
            onClick={onClose} 
            className="btn btn-neutral btn-block shadow-lg hover:scale-[1.02] transition-transform"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorDetailsModal;