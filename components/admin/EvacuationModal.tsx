"use client";

import { useState } from "react";

export default function EvacuationModal({ center, onClose }: any) {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold text-red-700 mb-2">Add People</h2>

        <p className="text-sm text-gray-600 mb-4">
          Ilang taong idadagdag sa <b>{center.name}</b>?
        </p>

        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full border rounded-lg p-2 mb-4"
          min={1}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">
            Cancel
          </button>

          <button
            onClick={() => {
              alert(`Added ${count} people to ${center.name}`);
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
