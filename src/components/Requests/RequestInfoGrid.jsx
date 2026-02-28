import { Calendar, Users, MapPin, Droplets, CheckCircle2, Clock } from "lucide-react";

const RequestInfoGrid = ({ request }) => (
  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Left Column: Timing & Urgency */}
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Status & Timing</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-lg text-red-600"><Calendar size={24}/></div>
          <div>
            <p className="text-sm text-gray-500">Donation Date</p>
            <p className="font-bold text-gray-800">{request.donation_date}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${request.is_fulfilled ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
            {request.is_fulfilled ? <CheckCircle2 size={24}/> : <Clock size={24}/>}
          </div>
          <div>
            <p className="text-sm text-gray-500">Request Status</p>
            <p className="font-bold text-gray-800">
              {request.is_fulfilled ? "Fulfilled" : "Still Seeking Donors"}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Right Column: Donor Progress */}
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Donor Progress</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><Users size={24}/></div>
          <div>
            <p className="text-sm text-gray-500">Donors Committed</p>
            <p className="font-bold text-gray-800">{request.current_donors_count} Donors</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-lg text-red-600"><Droplets size={24}/></div>
          <div>
            <p className="text-sm text-gray-500">Bags Still Needed</p>
            <p className="font-bold text-red-600">{request.bags_still_needed} / {request.bags_needed}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RequestInfoGrid;