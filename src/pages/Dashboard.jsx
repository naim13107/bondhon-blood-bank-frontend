import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import DashboardOverview from "../components/Dashboard/DashboardOverview";
import ProfileSettings from "../components/Dashboard/ProfileSettings";
import DonationHistory from "../components/Dashboard/DonationHistory"; 
import TransactionHistory from "./TransactionHistory";

// 1. Added Receipt icon to the import
import { User, LayoutDashboard, Clock, Receipt } from "lucide-react"; 

const Dashboard = () => {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState("overview");

  const tokenString = localStorage.getItem("authTokens");
  const tokens = tokenString ? JSON.parse(tokenString) : null;
  const userId = user?.user_id || user?.id;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-[80vh] flex flex-col md:flex-row gap-8">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 bg-red-600 text-white text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <span className="text-3xl font-bold text-red-600">{user?.username?.charAt(0).toUpperCase() || "U"}</span>
            </div>
            <h2 className="font-bold text-lg">{user?.username || "Donor"}</h2>
          </div>
          
          <ul className="p-2 space-y-1">
            <li>
              <button 
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${activeTab === 'overview' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <LayoutDashboard size={20} />
                Overview
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("history")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${activeTab === 'history' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Clock size={20} />
                History
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${activeTab === 'profile' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <User size={20} />
                Profile Settings
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("tran_history")}
                // 2. Fixed the activeTab check here to 'tran_history'
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${activeTab === 'tran_history' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {/* 3. Changed icon to Receipt for better visual distinction */}
                <Receipt size={20} />
                Transactions History
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {activeTab === "overview" && <DashboardOverview tokens={tokens} />}
        {activeTab === "history" && <DonationHistory tokens={tokens} />} 
        {activeTab === "profile" && <ProfileSettings tokens={tokens} userId={userId} />}
        {activeTab === "tran_history" && <TransactionHistory />}
      </div>
      
    </div>
  );
};

export default Dashboard;