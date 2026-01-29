"use client";

import { useState } from "react";

type Request = {
  itemName: string;
  quantity: number;
  requestedBy: string;
  date: string;
  time: string;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
};

// Mock data for Requests tabs
const requestsData: Record<string, Request[]> = {
  Requests: [
    {
      itemName: "Water 1L",
      quantity: 3,
      requestedBy: "Kenneth Bulan",
      date: "2026-01-17",
      time: "14:30:00",
      status: "Pending",
    },
    {
      itemName: "Water 1L",
      quantity: 3,
      requestedBy: "Kenneth Bulan",
      date: "2026-01-17",
      time: "14:30:00",
      status: "Pending",
    },
    {
      itemName: "Water 1L",
      quantity: 3,
      requestedBy: "Kenneth Bulan",
      date: "2026-01-17",
      time: "14:30:00",
      status: "Pending",
    },
    {
      itemName: "Water 1L",
      quantity: 3,
      requestedBy: "Kenneth Bulan",
      date: "2026-01-17",
      time: "14:30:00",
      status: "Pending",
    },
    {
      itemName: "Water 1L",
      quantity: 3,
      requestedBy: "Kenneth Bulan",
      date: "2026-01-17",
      time: "14:30:00",
      status: "Pending",
    },
  ],
  "In Progress": [
    {
      itemName: "Rice 5kg",
      quantity: 2,
      requestedBy: "Maria Santos",
      date: "2026-01-16",
      time: "10:15:00",
      status: "In Progress",
    },
  ],
  Completed: [
    {
      itemName: "Canned Goods",
      quantity: 10,
      requestedBy: "Juan Dela Cruz",
      date: "2026-01-15",
      time: "09:00:00",
      status: "Completed",
    },
  ],
  Cancelled: [
    {
      itemName: "Medicine Kit",
      quantity: 1,
      requestedBy: "Ana Reyes",
      date: "2026-01-14",
      time: "16:45:00",
      status: "Cancelled",
    },
  ],
};

// Mock data for Donation tabs
const donationData: Record<string, Request[]> = {
  Donation: [
    {
      itemName: "Water 1L",
      quantity: 3,
      requestedBy: "Kenneth Bulan",
      date: "2026-01-17",
      time: "14:30:00",
      status: "Pending",
    },
    {
      itemName: "Water 1L",
      quantity: 3,
      requestedBy: "Kenneth Bulan",
      date: "2026-01-17",
      time: "14:30:00",
      status: "Pending",
    },
    {
      itemName: "Water 1L",
      quantity: 3,
      requestedBy: "Kenneth Bulan",
      date: "2026-01-17",
      time: "14:30:00",
      status: "Pending",
    },
    {
      itemName: "Water 1L",
      quantity: 3,
      requestedBy: "Kenneth Bulan",
      date: "2026-01-17",
      time: "14:30:00",
      status: "Pending",
    },
    {
      itemName: "Water 1L",
      quantity: 3,
      requestedBy: "Kenneth Bulan",
      date: "2026-01-17",
      time: "14:30:00",
      status: "Pending",
    },
  ],
  "To Receive": [
    {
      itemName: "Blankets",
      quantity: 5,
      requestedBy: "Pedro Cruz",
      date: "2026-01-16",
      time: "11:20:00",
      status: "In Progress",
    },
  ],
  Completed: [
    {
      itemName: "Food Packs",
      quantity: 20,
      requestedBy: "Lisa Garcia",
      date: "2026-01-15",
      time: "13:30:00",
      status: "Completed",
    },
  ],
  Cancelled: [
    {
      itemName: "Tents",
      quantity: 2,
      requestedBy: "Roberto Tan",
      date: "2026-01-14",
      time: "15:00:00",
      status: "Cancelled",
    },
  ],
};

// Helper function to get status color
const getStatusColor = (status: Request["status"]) => {
  switch (status) {
    case "Pending":
      return "text-orange-500"; // Change to other colors like text-yellow-500, text-amber-500
    case "In Progress":
      return "text-blue-500"; // Change to your preferred color
    case "Completed":
      return "text-green-500"; // Change to your preferred color
    case "Cancelled":
      return "text-red-500"; // Change to your preferred color
    default:
      return "text-gray-500";
  }
};

// Helper function to get status dot color
const getStatusDotColor = (status: Request["status"]) => {
  switch (status) {
    case "Pending":
      return "bg-orange-500"; // Change to other colors like bg-yellow-500, bg-amber-500
    case "In Progress":
      return "bg-blue-500"; // Change to your preferred color
    case "Completed":
      return "bg-green-500"; // Change to your preferred color
    case "Cancelled":
      return "bg-red-500"; // Change to your preferred color
    default:
      return "bg-gray-500";
  }
};

export default function CommunityRequestsPage() {
  const [activeRequestTab, setActiveRequestTab] = useState("Requests");
  const [activeDonationTab, setActiveDonationTab] = useState("Donation");

  const requestTabs = ["Requests", "In Progress", "Completed", "Cancelled"];
  const donationTabs = ["Donation", "To Receive", "Completed", "Cancelled"];

  // Get current data based on active tabs
  const currentRequestData = requestsData[activeRequestTab] || [];
  const currentDonationData = donationData[activeDonationTab] || [];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Community Sharing</h1>
      </div>

      {/* REQUESTS SECTION */}
      <div>
        {/* Request Tabs */}
        <div className="flex gap-50 mb-6 border-b border-gray-200 bg-white px-2 py-2.5">
          {requestTabs.map((tab) => (
            <button
              key={tab}
              className={`pb-3 px-1 font-medium transition-colors ${
                activeRequestTab === tab
                  ? "border-b-2 border-red-500 text-red-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveRequestTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Request Table */}
        <div
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          style={{ minHeight: "320px" }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Item Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Requested by
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentRequestData.map((req, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {req.itemName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {req.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {req.requestedBy}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {req.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {req.time}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {/* Status Dot - Change color using getStatusDotColor function above */}
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusDotColor(
                            req.status,
                          )}`}
                        ></div>
                        {/* Status Text - Change color using getStatusColor function above */}
                        <span
                          className={`font-medium ${getStatusColor(req.status)}`}
                        >
                          {req.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* DONATION SECTION */}
      <div>
        {/* Donation Tabs */}
        <div className="flex gap-50 mb-6 border-b border-gray-200 px-2 py-3 bg-white">
          {donationTabs.map((tab) => (
            <button
              key={tab}
              className={`pb-3 px-1 font-medium transition-colors ${
                activeDonationTab === tab
                  ? "border-b-2 border-green-500 text-green-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveDonationTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Donation Table */}
        <div
          className="bg-white rounded-lg border border-gray-200 overflow-hidden "
          style={{ minHeight: "320px" }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Item Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Requested by
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentDonationData.map((req, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {req.itemName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {req.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {req.requestedBy}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {req.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {req.time}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {/* Status Dot - Change color using getStatusDotColor function above */}
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusDotColor(
                            req.status,
                          )}`}
                        ></div>
                        {/* Status Text - Change color using getStatusColor function above */}
                        <span
                          className={`font-medium ${getStatusColor(req.status)}`}
                        >
                          {req.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
