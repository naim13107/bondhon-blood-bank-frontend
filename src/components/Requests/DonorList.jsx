import { Mail, CheckCircle } from "lucide-react";

const DonorList = ({ donorEmails }) => {
  return (
    <div className="p-8 border-t border-gray-100 bg-white">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Mail size={20} className="text-red-600" /> 
        Committed Donors ({donorEmails?.length || 0})
      </h3>
      
      {donorEmails && donorEmails.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {donorEmails.map((email, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div className="bg-green-100 p-1.5 rounded-full text-green-600">
                <CheckCircle size={14} />
              </div>
              <span className="text-sm font-medium text-gray-700 truncate">
                {email}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No donors have committed to this request yet.</p>
      )}
    </div>
  );
};

export default DonorList;