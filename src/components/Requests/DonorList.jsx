import { Mail, CheckCircle } from "lucide-react";

const DonorList = ({ donorEmails }) => {
  return (
    <div className="p-8 border-t border-base-300 bg-base-100">
      <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
        <Mail size={20} className="text-red-600" /> 
        Committed Donors ({donorEmails?.length || 0})
      </h3>
      
      {donorEmails && donorEmails.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {donorEmails.map((email, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-3 bg-base-200 rounded-lg border border-base-300"
            >
              <div className="bg-green-100 p-1.5 rounded-full text-green-600">
                <CheckCircle size={14} />
              </div>
              <span className="text-sm font-medium text-base-content truncate">
                {email}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-base-content/60 italic">No donors have committed to this request yet.</p>
      )}
    </div>
  );
};

export default DonorList;