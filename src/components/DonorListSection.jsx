import { useEffect, useState } from "react";
import apiClient from "../services/api-client"; 
import { User, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";

const DonorListSection = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
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
    <section className="py-12 bg-base-100 rounded-3xl shadow-sm border border-base-300 my-10 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-base-content">Registered Donors</h2>
          <p className="text-base-content/60">Find life-savers available in your area</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
          <input 
            type="text" 
            placeholder="Search blood group or area..."
            className="input input-bordered w-full pl-10 bg-base-200 border-base-300 focus:border-error"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner text-error loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200 text-base-content/80">
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
                <tr key={donor.id} className="hover:bg-base-200 transition-colors">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        
                        <div className="bg-error/10 text-error rounded-full w-10 flex items-center justify-center">
                          <User size={20} />
                        </div>
                      </div>
                      <span className="font-bold text-base-content">{donor.full_name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-error text-white font-bold px-4 py-3">
                      {donor.blood_group}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-base-content/60">
                      <MapPin size={14} /> {donor.address || "Dhaka, Bangladesh"}
                    </div>
                  </td>
                  <td>
                    <span className="flex items-center gap-1 text-success font-semibold text-sm">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div> Available
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
              <p className="text-base-content/50 italic">No matching available donors found at the moment.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default DonorListSection;