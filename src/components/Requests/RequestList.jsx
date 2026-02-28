import RequestItem from "./RequestItem"; 
import useAuthContext from "../../hooks/useAuthContext";

const RequestList = ({ requests, loading, onRefresh }) => {
  const { user } = useAuthContext();
  
  // Safely grab the user ID and ensure it is a number
  const currentUserId = user ? Number(user.user_id || user.id) : null;

  if (loading) return (
    <div className="text-center py-20">
      <span className="loading loading-spinner text-red-600 loading-lg"></span>
    </div>
  );

  // Safely compare numbers so strict inequality works
  const visibleRequests = user 
    ? requests.filter(req => Number(req.recipient) !== currentUserId) 
    : requests; 

  if (!visibleRequests || visibleRequests.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <p className="font-medium text-gray-500">No emergency requests found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {visibleRequests.map((req) => (
        <RequestItem 
          key={req.id} 
          request={req} 
          currentUserId={currentUserId} 
          onRefresh={onRefresh} 
        />
      ))}
    </div>
  );
};

export default RequestList;