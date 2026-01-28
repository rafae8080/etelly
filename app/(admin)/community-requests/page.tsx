"use client";

import { useState } from "react";

const requests = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    requestType: "Evacuation Assistance",
    message: "May baha na po sa bahay namin",
    status: "pending",
  },
  {
    id: 2,
    name: "Maria Santos",
    requestType: "Relief Goods",
    message: "Kulang na po pagkain namin",
    status: "pending",
  },
];

export default function CommunityRequestPage() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  return (
    <div className="min-h-screen bg-red-100 p-6">
      <h1 className="text-3xl font-bold text-red-800 mb-6">
        Community Requests (Admin)
      </h1>
    </div>
  );
}
