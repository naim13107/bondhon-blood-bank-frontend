import { Calendar, Users, MapPin, Droplets, CheckCircle2, Clock } from "lucide-react";

const RequestInfoGrid = ({ request }) => (
  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 bg-base-100">
    {/* Left Column: Timing & Urgency */}
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-base-content border-b border-base-300 pb-2">Status & Timing</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-error/10 rounded-lg text-error">
            <Calendar size={24}/>
          </div>
          <div>
            <p className="text-sm text-base-content/50">Donation Date</p>
            <p className="font-bold text-base-content">{request.donation_date}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${request.is_fulfilled ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
            {request.is_fulfilled ? <CheckCircle2 size={24}/> : <Clock size={24}/>}
          </div>
          <div>
            <p className="text-sm text-base-content/50">Request Status</p>
            <p className="font-bold text-base-content">
              {request.is_fulfilled ? "Fulfilled" : "Still Seeking Donors"}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Right Column: Donor Progress */}
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-base-content border-b border-base-300 pb-2">Donor Progress</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-info/10 rounded-lg text-info">
            <Users size={24}/>
          </div>
          <div>
            <p className="text-sm text-base-content/50">Donors Committed</p>
            <p className="font-bold text-base-content">{request.current_donors_count} Donors</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-error/10 rounded-lg text-error">
            <Droplets size={24}/>
          </div>
          <div>
            <p className="text-sm text-base-content/50">Bags Still Needed</p>
            <p className="font-bold text-error">{request.bags_still_needed} / {request.bags_needed}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RequestInfoGrid;