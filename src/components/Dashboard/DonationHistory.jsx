import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // 1. Import Link
import apiClient from "../../services/api-client";
import { Calendar, Droplets, XCircle, CheckCircle, ChevronRight } from "lucide-react";

const DonationHistory = ({ tokens }) => {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState("donated");

  useEffect(() => {
    apiClient.get("/dashboard/", {
      headers: { Authorization: `JWT ${tokens?.access}` }
    })
    .then(res => {
      setHistory(res.data.history);
    })
    .catch(err => console.error("History fetch error:", err))
    .finally(() => setLoading(false));
  }, [tokens]);

  if (loading) return <div className="text-center py-20"><span className="loading loading-spinner text-red-600 loading-lg"></span></div>;
  if (!history) return <p className="text-center py-10 text-red-500">Failed to load history data.</p>;

  const renderList = (dataList, emptyMessage, type) => {
    if (dataList.length === 0) {
      return <p className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg">{emptyMessage}</p>;
    }

    return (
      <ul className="divide-y divide-gray-100">
        {dataList.map(req => (
          <li key={req.id}>
            {/* 2. Wrap the list item content in a Link */}
            <Link 
              to={`/requests/${req.id}`} 
              className="py-5 px-2 hover:bg-gray-50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`badge text-white font-bold ${type === 'canceled' ? 'badge-neutral' : 'badge-error'}`}>
                    {req.blood_group}
                  </span>
                  <span className="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">
                    {req.hospital_name}
                  </span>
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Calendar size={15} /> Date: <span className="font-medium">{req.donation_date}</span>
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {type === 'canceled' ? (
                    <span className="flex items-center gap-1 text-gray-500 bg-gray-100 px-3 py-1 rounded-md text-sm font-semibold">
                      <XCircle size={16} /> Canceled
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded-md text-sm font-semibold">
                      <CheckCircle size={16} /> Completed
                    </span>
                  )}
                </div>
                {/* 3. Added a Chevron for better UX */}
                <ChevronRight className="text-gray-300 group-hover:text-red-600 transition-colors" size={20} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Droplets className="text-red-600" /> My History
      </h3>

      <div className="tabs tabs-boxed bg-gray-50 p-1 mb-6 inline-flex w-full md:w-auto">
        <button 
          className={`tab flex-1 md:w-32 font-bold ${activeSubTab === 'donated' ? 'tab-active bg-red-600 text-white' : 'text-gray-500'}`}
          onClick={() => setActiveSubTab('donated')}
        >
          Donated
        </button>
        <button 
          className={`tab flex-1 md:w-32 font-bold ${activeSubTab === 'received' ? 'tab-active bg-red-600 text-white' : 'text-gray-500'}`}
          onClick={() => setActiveSubTab('received')}
        >
          Received
        </button>
        <button 
          className={`tab flex-1 md:w-32 font-bold ${activeSubTab === 'canceled' ? 'tab-active bg-gray-700 text-white' : 'text-gray-500'}`}
          onClick={() => setActiveSubTab('canceled')}
        >
          Canceled
        </button>
      </div>

      <div className="mt-4">
        {activeSubTab === 'donated' && renderList(history.donated, "You have not completed any donations yet.", "donated")}
        {activeSubTab === 'received' && renderList(history.received, "You have not received any blood donations yet.", "received")}
        {activeSubTab === 'canceled' && renderList(history.canceled, "You have no canceled requests.", "canceled")}
      </div>
    </div>
  );
};

export default DonationHistory;