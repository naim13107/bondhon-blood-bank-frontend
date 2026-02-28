import { useState } from "react";
import { Link } from "react-router-dom"; 
import { PlusCircle } from "lucide-react"; 

// Components
import RequestList from "./RequestList";
import Pagination from "./Pagination";
import RequestFilterSection from "./RequestFilterSection";

// Custom Hook
import useFetchRequests from "../../hooks/useFetchRequests";

const RequestsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(""); 

  // Pull 'refresh' from the hook
  const { requests, loading, totalPages, refresh } = useFetchRequests(
    currentPage,
    selectedBloodGroup,
    searchQuery,
    sortOrder
  );

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Emergency Blood Requests</h1>
        
        <Link 
          to="/add-request" 
          className="btn bg-red-600 hover:bg-red-700 text-white border-none shadow-md gap-2 px-6"
        >
          <PlusCircle size={20} />
          Post New Request
        </Link>
      </div>

      <RequestFilterSection
        bloodGroups={bloodGroups}
        selectedBloodGroup={selectedBloodGroup}
        handleBloodGroupChange={(val) => { setSelectedBloodGroup(val); setCurrentPage(1); }}
        searchQuery={searchQuery}
        handleSearchQuery={(val) => { setSearchQuery(val); setCurrentPage(1); }}
        sortOrder={sortOrder}
        handleSorting={(val) => { setSortOrder(val); setCurrentPage(1); }}
      />
      
      {/* Pass the refresh function to the list */}
      <RequestList requests={requests} loading={loading} onRefresh={refresh} />
      
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={setCurrentPage}
      />
    </div>
  );
};

export default RequestsPage;