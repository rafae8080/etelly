export default function RequestCard({ request, onApprove }: any) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border-l-8 border-red-600 hover:scale-105 transition">
      <h2 className="text-xl font-semibold text-red-700">
        {request.requestType}
      </h2>

      <p className="text-sm text-gray-600 mt-1">
        Requested by: <b>{request.name}</b>
      </p>

      <p className="mt-3 text-gray-700">{request.message}</p>

      <p className="mt-2 font-bold text-orange-600">
        Status: {request.status.toUpperCase()}
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={onApprove}
          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        >
          Approve
        </button>

        <button className="flex-1 bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed">
          Reject
        </button>
      </div>
    </div>
  );
}
