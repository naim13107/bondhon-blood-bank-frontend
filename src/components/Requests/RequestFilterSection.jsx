const RequestFilterSection = ({
  bloodGroups,
  selectedBloodGroup,
  handleBloodGroupChange,
  searchQuery,
  handleSearchQuery,
  sortOrder,
  handleSorting,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8 items-end bg-white p-6 rounded-xl shadow-sm">
      {/* Search Input - Hits the 'search' parameter */}
      <div className="form-control w-full max-w-xs">
        <label className="label"><span className="label-text font-bold">Search Hospital</span></label>
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e.target.value)}
        />
      </div>

      {/* Blood Group Filter - Hits the 'blood_group' parameter */}
      <div className="form-control w-full max-w-xs">
        <label className="label"><span className="label-text font-bold">Blood Group</span></label>
        <select
          className="select select-bordered"
          value={selectedBloodGroup}
          onChange={(e) => handleBloodGroupChange(e.target.value)}
        >
          <option value="">All Groups</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
      </div>

      {/* Sort Order - Fixed to match your Backend Screenshot */}
      <div className="form-control w-full max-w-xs">
        <label className="label"><span className="label-text font-bold">Sort By</span></label>
        <select
          className="select select-bordered"
          value={sortOrder}
          onChange={(e) => handleSorting(e.target.value)}
        >
          {/* These 'value' strings must match the keys in your backend screenshot */}
          <option value="-created_at">Newest First </option>
          <option value="created_at">Oldest First </option>
          <option value="donation_date">Donation Date </option>
          <option value="bags_needed">Bags Needed (Lowest first)</option>
          <option value="-bags_needed">Bags Needed (Highest first)</option>
        </select>
      </div>
    </div>
  );
};

export default RequestFilterSection;