import React from 'react';
import { HeartHandshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import blooddonor from "../assets/images/world-blood-donor-day-illustration.webp";

const Fundraising = () => {
  const navigate = useNavigate(); // 2. Initialize it

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Image */}
        <div className="md:w-1/2 bg-red-50 flex items-center justify-center p-10">
          <img 
            src={blooddonor} 
            alt="Blood donation bag and medical supplies illustration" 
            className="w-full max-w-md object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center space-y-6">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-3 rounded-full">
              <HeartHandshake className="text-red-600 w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 leading-tight">
              Fuel Our Mission to Save Lives
            </h1>
          </div>
          
          <div className="space-y-4 text-lg text-gray-600">
            <p>
              Your generous donation is the lifeblood of our platform. It helps us maintain our technology, organize local blood donation camps, and reach more people in urgent need.
            </p>
            <p>
              Every contribution, no matter the size, directly supports our efforts to connect donors with patients, ensuring that no request for blood goes unanswered. Together, we can build a stronger, healthier community.
            </p>
          </div>

          <div className="pt-4">
            {/* 3. Add onClick handler */}
            <button 
              onClick={() => navigate('/donate')} 
              className="btn btn-primary bg-red-600 hover:bg-red-700 border-none text-white px-10 py-4 text-xl rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <HeartHandshake className="w-6 h-6" />
              Donate Fund
            </button>
            <p className="text-gray-500 text-sm mt-4 pl-2">
              Your transaction is secure and encrypted.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Fundraising;