"use client";

import {
  AlertTriangle,
  Info,
  AlertCircle,
  X,
  Waves,
  Stone,
  Flame,
  BrickWall,
} from "lucide-react";
import { useState } from "react";

interface AlertTileProps {
  id: string;
  type: string;
  severity: string;
  rescue: boolean;
  description: string;
  location: string;
  timestamp: string;
  reportedBy: string;
  hasImage: boolean;
  imageUrl?: string;
}

export default function AlertTile({
  id,
  type,
  severity,
  rescue,
  description,
  location,
  timestamp,
  reportedBy,
  hasImage,
  imageUrl,
}: AlertTileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to get icon based on type
  const getReportIcon = () => {
    if (type === "Flood") return Waves;
    if (type === "Fire") return Flame;
    if (type === "Earthquake") return Stone;
    if (type === "Seawall break") return BrickWall;
    return Info; // Default icon
  };

  // Function to get color based on type
  const getReportColor = () => {
    if (type === "Flood") return "text-red-600 bg-red-50";
    if (type === "Fire") return "text-red-600 bg-red-50";
    if (type === "Earthquake") return "text-orange-600 bg-orange-50";
    return "text-blue-600 bg-blue-50"; // Default color
  };

  const Icon = getReportIcon();
  const iconColor = getReportColor();

  const handleApprove = () => {
    alert(`Alert ${id} approved!`);
    setIsModalOpen(false);
    // TODO: Add approve logic here
  };

  const handleReject = () => {
    alert(`Alert ${id} rejected!`);
    setIsModalOpen(false);
    // TODO: Add reject logic here
  };

  return (
    <>
      {/* Alert Tile - Clickable */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-white p-4 rounded-xl border border-gray-400 hover:border-red-500 cursor-pointer hover:shadow-md transition-all"
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`p-2 rounded-lg ${iconColor}`}>
            <Icon size={20} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">
                  {type}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              </div>

              {/* Severity Badge */}
              <span
                className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                  severity === "high"
                    ? "bg-red-100 text-red-700"
                    : severity === "medium"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {severity.toUpperCase()}
              </span>
            </div>

            {/* Info */}
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span>📍 {location}</span>
              <span>🕐 {timestamp}</span>
              {rescue && (
                <span className="flex items-center gap-1 text-red-600 font-medium">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  Rescue needed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-gray-200">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${iconColor}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{type}</h2>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}

            {/* Image Section */}
            {hasImage && imageUrl && (
              <div>
                <div className="relative w-full h-64  overflow-hidden bg-gray-100">
                  <img
                    src={imageUrl}
                    alt={`${type} incident`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="p-6 space-y-6">
              {/* Severity */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Severity Level
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    severity === "high"
                      ? "bg-red-100 text-red-700"
                      : severity === "medium"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {severity.toUpperCase()}
                </span>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Description
                </p>
                <p className="text-gray-900">{description}</p>
              </div>

              {/* Location */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Location
                </p>
                <p className="text-gray-900">📍 {location}</p>
              </div>

              {/* Timestamp */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Reported At
                </p>
                <p className="text-gray-900">🕐 {timestamp}</p>
              </div>

              {/* Reported By */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Reported By
                </p>
                <p className="text-gray-900"> {reportedBy}</p>
              </div>

              {/* Rescue Status */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Rescue Needed
                </p>
                {rescue ? (
                  <div className="flex items-center gap-2">
                    <span className="text-red-700 font-medium">Yes</span>
                  </div>
                ) : (
                  <span className="text-gray-700 font-medium">No</span>
                )}
              </div>
            </div>

            {/* Modal Footer - Action Buttons */}
            <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleReject}
                className="flex-1 px-6 py-3 border border-red-500 opacity-85 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
              >
                Reject Report
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 px-6 py-3 border-2 border-green-600 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                Approve Report
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
