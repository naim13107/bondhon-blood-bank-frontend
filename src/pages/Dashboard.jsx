import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import DashboardOverview from "../components/Dashboard/DashboardOverview";
import ProfileSettings from "../components/Dashboard/ProfileSettings";
import DonationHistory from "../components/Dashboard/DonationHistory"; 
import TransactionHistory from "./TransactionHistory";

import { User, LayoutDashboard, Clock, Receipt } from "lucide-react"; 

const Dashboard = () => {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState("overview");

  const tokenString = localStorage.getItem("authTokens");
  const tokens = tokenString ? JSON.parse(tokenString) : null;
  const userId = user?.user_id || user?.id;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-[80vh] flex flex-col md:flex-row gap-8 bg-base-100">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden">
          <div className="p-6 bg-error text-error-content text-center">
            <div className="w-20 h-20 bg-base-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <span className="text-3xl font-bold text-error">{user?.username?.charAt(0).toUpperCase() || "U"}</span>
            </div>
            <h2 className="font-bold text-lg">{user?.username || "Donor"}</h2>
          </div>
          
          <ul className="p-2 space-y-1">
            <li>
              <button 
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${activeTab === 'overview' ? 'bg-error/10 text-error' : 'text-base-content/70 hover:bg-base-200'}`}
              >
                <LayoutDashboard size={20} />
                Overview
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("history")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${activeTab === 'history' ? 'bg-error/10 text-error' : 'text-base-content/70 hover:bg-base-200'}`}
              >
                <Clock size={20} />
                History
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${activeTab === 'profile' ? 'bg-error/10 text-error' : 'text-base-content/70 hover:bg-base-200'}`}
              >
                <User size={20} />
                Profile Settings
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("tran_history")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${activeTab === 'tran_history' ? 'bg-error/10 text-error' : 'text-base-content/70 hover:bg-base-200'}`}
              >
                <Receipt size={20} />
                Transactions History
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 text-base-content">
        {activeTab === "overview" && <DashboardOverview tokens={tokens} />}
        {activeTab === "history" && <DonationHistory tokens={tokens} />} 
        {activeTab === "profile" && <ProfileSettings tokens={tokens} userId={userId} />}
        {activeTab === "tran_history" && <TransactionHistory />}
      </div>
      
    </div>
  );
};

export default Dashboard;