import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";
import { ArrowLeft, Mail, Clock } from "lucide-react";
import { toast } from "react-hot-toast";
import useAuthContext from "../hooks/useAuthContext";

import RequestDetailsHeader from "../components/Requests/RequestDetailsHeader";
import RequestInfoGrid from "../components/Requests/RequestInfoGrid";
import RequestActionFooter from "../components/Requests/RequestActionFooter";
import DonorList from "../components/Requests/DonorList"; 

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    apiClient.get(`/requests/${id}/`)
      .then(res => setRequest(res.data))
      .catch(() => {
        toast.error("Request not found");
        navigate("/requests");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleAction = async () => {
    if (!user) return navigate("/login");
    setActionLoading(true);
    
    const tokenString = localStorage.getItem("authTokens");
    const tokens = tokenString ? JSON.parse(tokenString) : null;
    const config = { headers: { Authorization: `JWT ${tokens?.access}` } };
    
    const hasCommitted = request.donor_emails?.includes(user?.email);
    const endpoint = hasCommitted ? 'withdraw' : 'accept';

    try {
      await apiClient.post(`/requests/${id}/${endpoint}/`, {}, config);
      const updated = await apiClient.get(`/requests/${id}/`);
      setRequest(updated.data);
      toast.success(hasCommitted ? "Withdrawn successfully" : "Commitment successful!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20"><span className="loading loading-spinner text-error loading-lg"></span></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-base-100">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-base-content/60 hover:text-error mb-6 font-medium transition-colors">
        <ArrowLeft size={20} /> Back to Requests
      </button>

      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
        <RequestDetailsHeader 
          bloodGroup={request.blood_group}
          hospitalName={request.hospital_name}
          bagsNeeded={request.bags_needed}
        />
        
        {/* Recipient Details Section */}
        <div className="px-8 py-4 bg-base-200 flex flex-wrap items-center justify-between border-b border-base-300 gap-2">
           <div className="flex items-center gap-2 text-sm text-base-content/70">
              <Clock size={16} className="text-base-content/40" /> 
              <span>Posted: <span className="font-semibold text-base-content">{new Date(request.created_at).toLocaleDateString()}</span></span>
              <span className="mx-2 hidden sm:inline">|</span>
              <Mail size={16} className="text-base-content/40" />
              <span>Recipient: <span className="font-semibold text-base-content">{request.recipient_email}</span></span>
           </div>
        </div>

        <RequestInfoGrid request={request} />

        <DonorList donorEmails={request.donor_emails} />

        <RequestActionFooter 
          isRecipient={request.recipient === user?.user_id}
          hasDonated={request.donor_emails?.includes(user?.email)}
          isFulfilled={request.is_fulfilled}
          onAction={handleAction}
          loading={actionLoading}
        />
      </div>
    </div>
  );
};

export default RequestDetails;