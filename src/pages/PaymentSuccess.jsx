import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 bg-base-100">
      <div className="bg-base-100 p-8 rounded-3xl shadow-xl text-center max-w-md border border-base-300">
        <div className="flex justify-center mb-6">
          <div className="bg-success/10 p-4 rounded-full text-success">
            <CheckCircle size={64} />
          </div>
        </div>
        <h2 className="text-3xl font-black text-base-content mb-4">Donation Successful!</h2>
        <p className="text-base-content/60 mb-8 text-lg">
          Thank you for your generous contribution. Your support helps us keep our mission alive.
        </p>
        <button 
          onClick={() => navigate('/dashboard/payment/transactions')}
          className="btn btn-block bg-success hover:bg-success/80 text-success-content border-none rounded-xl h-14 text-lg font-bold flex items-center justify-center gap-2"
        >
          View History <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;