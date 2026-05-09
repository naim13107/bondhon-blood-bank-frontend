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
    <div className="flex flex-wrap gap-4 mb-8 items-end bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
      {/* Search Input - Hits the 'search' parameter */}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text font-bold text-base-content">Search Hospital</span>
        </label>
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full bg-base-200 text-base-content focus:border-error"
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e.target.value)}
        />
      </div>

      {/* Blood Group Filter - Hits the 'blood_group' parameter */}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text font-bold text-base-content">Blood Group</span>
        </label>
        <select
          className="select select-bordered bg-base-200 text-base-content focus:border-error"
          value={selectedBloodGroup}
          onChange={(e) => handleBloodGroupChange(e.target.value)}
        >
          <option value="">All Groups</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Order */}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text font-bold text-base-content">Sort By</span>
        </label>
        <select
          className="select select-bordered bg-base-200 text-base-content focus:border-error"
          value={sortOrder}
          onChange={(e) => handleSorting(e.target.value)}
        >
          <option value="-created_at">Newest First</option>
          <option value="created_at">Oldest First</option>
          <option value="donation_date">Donation Date</option>
          <option value="bags_needed">Bags Needed (Lowest first)</option>
          <option value="-bags_needed">Bags Needed (Highest first)</option>
        </select>
      </div>
    </div>
  );
};

export default RequestFilterSection;