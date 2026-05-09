import { useEffect, useState } from "react";
import { Receipt, AlertCircle } from "lucide-react";
import apiClient from "../services/api-client";
import { useSearchParams } from "react-router-dom";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  
  // Detect if they landed here by canceling the payment
  const isCancelled = searchParams.get("status") === "cancelled";

  useEffect(() => {
    const tokenString = localStorage.getItem("authTokens");
    const tokens = tokenString ? JSON.parse(tokenString) : null;

    if (!tokens?.access) {
      setLoading(false);
      return;
    }

    // Fetch the user's transaction history from Django
    apiClient.get("/payment/history/", {
      headers: { Authorization: `JWT ${tokens.access}` }
    })
    .then(res => setTransactions(res.data.results || res.data))
    .catch(err => console.error("Failed to fetch transactions", err))
    .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 bg-base-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-error/10 p-3 rounded-full text-error">
          <Receipt size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-base-content">Donation History</h2>
          <p className="text-base-content/60">Track your financial contributions</p>
        </div>
      </div>

      {/* Show this alert ONLY if they cancelled a payment */}
      {isCancelled && (
        <div className="alert alert-warning mb-6 shadow-sm rounded-xl flex items-center gap-2 text-warning-content">
          <AlertCircle size={20} />
          <span className="font-medium">Your recent payment process was cancelled. No charges were made.</span>
        </div>
      )}

      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
        {loading ? (
          <div className="text-center py-20">
            <span className="loading loading-spinner text-error loading-lg"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-base-200 text-base-content/70 text-sm">
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <tr key={index} className="hover:bg-base-200/50 transition-colors border-b border-base-300">
                    <td className="font-mono text-base-content/50 text-xs">{txn.tran_id}</td>
                    <td className="font-medium text-base-content/80">
                      {new Date(txn.created_at).toLocaleDateString()}
                    </td>
                    <td className="font-black text-base-content">৳{txn.amount}</td>
                    <td>
                      {txn.status === "SUCCESS" ? (
                        <span className="badge badge-success text-white font-bold">Success</span>
                      ) : txn.status === "FAILED" ? (
                        <span className="badge badge-error text-white font-bold">Failed</span>
                      ) : (
                        <span className="badge badge-ghost font-bold text-base-content/60">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Empty State */}
            {transactions.length === 0 && (
              <div className="text-center py-16">
                <Receipt size={48} className="mx-auto text-base-content/20 mb-4" />
                <p className="text-base-content/50 font-medium">No transaction history found yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;