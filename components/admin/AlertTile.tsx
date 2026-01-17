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
  type: string;
  severity: string;
  description: string;
  location: string;
  timestamp: string;
}

export default function AlertTile({
  type,
  severity,
  description,
  location,
  timestamp,
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

  return (
    <>
      {/* Alert Tile - Clickable */}
      <div className="bg-white p-4 rounded-xl border-l-3 border-gray-400 hover:border-red-500 cursor-pointer hover:shadow-md transition-all">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
