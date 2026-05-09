import React from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 bg-base-100">
      <div className="bg-base-100 p-8 rounded-3xl shadow-xl text-center max-w-md border border-base-300">
        <div className="flex justify-center mb-6">
          {/* Using DaisyUI warning colors to signify a warning or "stopped" action */}
          <div className="bg-warning/10 p-4 rounded-full text-warning">
            <AlertCircle size={64} />
          </div>
        </div>
        <h2 className="text-3xl font-black text-base-content mb-4">Payment Canceled</h2>
        <p className="text-base-content/60 mb-8 text-lg">
          The transaction was canceled. No funds have been transferred from your account. 
        </p>
        <div className="space-y-3">
          <button 
            onClick={() => navigate('/donate')}
            className="btn btn-block bg-warning hover:bg-warning/80 text-warning-content border-none rounded-xl h-14 text-lg font-bold flex items-center justify-center gap-2"
          >
            Back to Donation Page
          </button>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn btn-block btn-ghost text-base-content/60 font-bold flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} /> Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;