import { useEffect, useState } from "react";
// Path fixed to go up one level to src, then into services
import apiClient from "../services/api-client"; 
import { User, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";

const DonorListSection = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // API call filtered for medically eligible donors
    apiClient.get("/donors/?is_available=true")
      .then(res => {
        setDonors(res.data.results || []);
      })
      .catch(err => console.error("Error fetching donors:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredDonors = donors.filter(d => 
    d.blood_group.toLowerCase().includes(filter.toLowerCase()) ||
    d.address?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="py-12 bg-white rounded-3xl shadow-sm border border-gray-100 my-10 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Registered Donors</h2>
          <p className="text-gray-500">Find life-savers available in your area</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search blood group or area..."
            className="input input-bordered w-full pl-10 bg-gray-50 border-gray-200 focus:border-red-500"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner text-red-600 loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th>Donor Name</th>
                <th>Blood Group</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.map(donor => (
                <tr key={donor.id} className="hover:bg-gray-50 transition-colors">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        {/* FIXED: Added items-center and justify-center to fix icon alignment */}
                        <div className="bg-red-100 text-red-600 rounded-full w-10 flex items-center justify-center">
                          <User size={20} />
                        </div>
                      </div>
                      <span className="font-bold">{donor.full_name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-error text-white font-bold px-4 py-3">
                      {donor.blood_group}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin size={14} /> {donor.address || "Dhaka, Bangladesh"}
                    </div>
                  </td>
                  <td>
                    <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Available
                    </span>
                  </td>
                  <td>
                    <Link to="/add-request" className="btn btn-sm btn-outline btn-error rounded-lg">
                      Request Blood
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredDonors.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 italic">No matching available donors found at the moment.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default DonorListSection;