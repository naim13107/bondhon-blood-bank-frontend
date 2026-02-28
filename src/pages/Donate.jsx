import { useState } from 'react';
import { Heart, ShieldCheck } from 'lucide-react';
import usePayment from '../hooks/usePayment';

const Donate = () => {
  const [amount, setAmount] = useState(1000); // Default amount
  const [customAmount, setCustomAmount] = useState("");
  const { initiatePayment, loading } = usePayment();

  const presetAmounts = [500, 1000, 2000, 5000];

  const handlePresetClick = (val) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val) setAmount(Number(val));
  };

  const handleDonate = () => {
    if (amount < 1) {
      alert("Minimum donation amount is 50 BDT.");
      return;
    }
    initiatePayment(amount);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 text-center">
        
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-4 rounded-full text-red-600">
            <Heart size={48} className="fill-current" />
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-gray-900 mb-2">Choose your impact</h2>
        <p className="text-gray-500 mb-10">Select an amount to support our blood donation operations.</p>

        {/* Preset Amount Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetClick(preset)}
              className={`py-4 rounded-xl font-bold text-lg transition-all border-2 ${
                amount === preset && !customAmount
                  ? 'border-red-600 bg-red-50 text-red-700'
                  : 'border-gray-100 hover:border-red-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              ৳{preset}
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-500 font-bold text-lg">৳</span>
          </div>
          <input
            type="number"
            min="1"
            value={customAmount}
            onChange={handleCustomChange}
            placeholder="Enter custom amount"
            className="input input-bordered w-full pl-10 h-14 text-lg font-bold focus:border-red-500"
          />
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleDonate}
          disabled={loading || amount <= 0}
          className="btn btn-block h-16 bg-red-600 hover:bg-red-700 text-white border-none text-xl rounded-2xl shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            `Donate ৳${amount}`
          )}
        </button>

        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500 font-medium">
          <ShieldCheck size={16} className="text-green-600" />
          <span>Secure checkout provided by SSLCommerz</span>
        </div>
      </div>
    </div>
  );
};

export default Donate;