import { Hospital } from "lucide-react";

const RequestDetailsHeader = ({ bloodGroup, hospitalName, bagsNeeded }) => (
  <div className="bg-red-600 p-8 text-white flex justify-between items-center">
    <div>
      <h1 className="text-4xl font-black mb-2">{bloodGroup} Needed</h1>
      <p className="opacity-90 flex items-center gap-2">
        <Hospital size={18} /> {hospitalName}
      </p>
    </div>
    <div className="bg-white text-red-600 p-4 rounded-xl text-center min-w-[100px] shadow-lg">
      <span className="block text-3xl font-bold">{bagsNeeded}</span>
      <span className="text-xs uppercase font-bold">Bags</span>
    </div>
  </div>
);

export default RequestDetailsHeader;