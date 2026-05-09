import { Hospital } from "lucide-react";

const RequestDetailsHeader = ({ bloodGroup, hospitalName, bagsNeeded }) => (
  // Using bg-error and text-error-content keeps the emergency red feel 
  // but allows DaisyUI to adjust the exact shade for dark mode.
  <div className="bg-error text-error-content p-8 flex justify-between items-center">
    <div>
      <h1 className="text-4xl font-black mb-2">{bloodGroup} Needed</h1>
      <p className="opacity-90 flex items-center gap-2">
        <Hospital size={18} /> {hospitalName}
      </p>
    </div>
    
    {/* Swapped bg-white to bg-base-100 so the box adapts to dark mode, 
        and text-red-600 to text-error to match the theme. */}
    <div className="bg-base-100 text-error p-4 rounded-xl text-center min-w-[100px] shadow-lg">
      <span className="block text-3xl font-bold">{bagsNeeded}</span>
      <span className="text-xs uppercase font-bold">Bags</span>
    </div>
  </div>
);

export default RequestDetailsHeader;