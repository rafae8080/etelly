"use client";

import { useState } from "react";
import EvacuationModal from "@/components/admin/EvacuationModal";

const centers = [
  {
    id: 1,
    name: "Barangay Hall Evacuation Center",
    address: "Brgy. Sampaloc, Manila",
    current: 80,
    capacity: 100,
  },
  {
    id: 2,
    name: "School Gym Evacuation Center",
    address: "Brgy. San Juan",
    current: 100,
    capacity: 100,
  },
];

export default function EvacuationPage() {
  const [selectedCenter, setSelectedCenter] = useState<any>(null);

  return (
    <div className="min-h-screen bg-red-100 p-6">
      <h1 className="text-3xl font-bold text-red-800 mb-6">
        Evacuation Centers
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {centers.map((center) => {
          const isFull = center.current >= center.capacity;

          return (
            <div
              key={center.id}
              onClick={() => setSelectedCenter(center)}
              className="cursor-pointer bg-white rounded-xl shadow-md p-5 border-l-8 border-red-600 hover:scale-105 transition"
            >
              <h2 className="text-xl font-semibold text-red-700">
                {center.name}
              </h2>

              <p className="text-sm text-gray-600 mt-1">{center.address}</p>

              <p className="mt-3">
                Capacity:{" "}
                <span className="font-bold">
                  {center.current}/{center.capacity}
                </span>
              </p>

              <p
                className={`mt-2 font-bold ${
                  isFull ? "text-red-600" : "text-green-600"
                }`}
              >
                Status: {isFull ? "FULL" : "MAY SPACE PA"}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCenter(center);
                }}
                className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Add People
              </button>
            </div>
          );
        })}
      </div>

      {selectedCenter && (
        <EvacuationModal
          center={selectedCenter}
          onClose={() => setSelectedCenter(null)}
        />
      )}
    </div>
  );
}
