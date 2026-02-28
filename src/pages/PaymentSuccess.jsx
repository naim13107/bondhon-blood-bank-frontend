import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md border border-green-50">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full text-green-600">
            <CheckCircle size={64} />
          </div>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Donation Successful!</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Thank you for your generous contribution. Your support helps us keep our mission alive.
        </p>
        <button 
          onClick={() => navigate('/dashboard/payment/transactions')}
          className="btn btn-block bg-green-600 hover:bg-green-700 text-white border-none rounded-xl h-14 text-lg font-bold flex items-center justify-center gap-2"
        >
          View History <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;