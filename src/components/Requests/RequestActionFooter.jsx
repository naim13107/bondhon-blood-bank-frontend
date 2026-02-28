const RequestActionFooter = ({ isRecipient, hasDonated, isFulfilled, onAction, loading }) => {
  if (isRecipient) {
    return (
      <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-center">
        <span className="badge badge-lg badge-ghost p-6 font-semibold">This is your request</span>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
      <p className="text-sm text-gray-500 max-w-md">
        Accepting this means you commit to visiting the hospital on the specified date.
      </p>
      
      <button 
        onClick={onAction}
        disabled={loading || (isFulfilled && !hasDonated)}
        className={`btn px-10 text-white border-none min-w-[200px] ${
          hasDonated ? 'bg-gray-700 hover:bg-gray-800' : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : hasDonated ? (
          "Withdraw Commitment"
        ) : (
          "Accept Request"
        )}
      </button>
    </div>
  );
};

export default RequestActionFooter;