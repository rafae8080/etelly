"use client";

export default function RequestModal({ request, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold text-red-700 mb-3">Approve Request</h2>

        <p className="text-sm text-gray-700 mb-4">
          Approve request from <b>{request.name}</b> for:
          <br />
          <b>{request.requestType}</b>
        </p>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={() => {
              alert("Request Approved!");
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
