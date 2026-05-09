import React from 'react';
import { XCircle, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentFail = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 bg-base-100">
      <div className="bg-base-100 p-8 rounded-3xl shadow-xl text-center max-w-md border border-base-300">
        <div className="flex justify-center mb-6">
          <div className="bg-error/10 p-4 rounded-full text-error">
            <XCircle size={64} />
          </div>
        </div>
        <h2 className="text-3xl font-black text-base-content mb-4">Payment Failed</h2>
        <p className="text-base-content/60 mb-8 text-lg">
          Something went wrong with the transaction. Don't worry, your account has not been charged.
        </p>
        <button 
          onClick={() => navigate('/donate')}
          className="btn btn-block bg-red-600 hover:bg-red-700 text-white border-none rounded-xl h-14 text-lg font-bold flex items-center justify-center gap-2"
        >
          Try Again <RefreshCcw size={20} />
        </button>
      </div>
    </div>
  );
};

export default PaymentFail;