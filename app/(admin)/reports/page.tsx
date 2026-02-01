import AlertTile from "@/components/admin/ReportTile";

export default function ReportsPage() {
  const alerts = [
    {
      id: "ALT-001",
      type: "Flood",
      severity: "high",
      rescue: true,
      description: "Heavy flooding reported. Water level rising rapidly.",
      location: "Barangay Santo Niño, Zone 3",
      timestamp: "2025-01-17 14:30:00",
      reportedBy: "Juan Dela Cruz",
      hasImage: true,
      imageUrl: "/images/flood.jpg",
    },
    {
      id: "ALT-002",
      type: "Fire",
      severity: "high",
      rescue: false,
      description: "Fire outbreak in Barangay San Isidro.",
      location: "Barangay San Isidro",
      timestamp: "2025-01-17 13:15:00",
      reportedBy: "Josephine Reyes",
      hasImage: false,
    },
    {
      id: "ALT-003",
      type: "Earthquake",
      severity: "medium",
      rescue: false,
      description: "Fallen tree blocking main road near the public market.",
      location: "Main Street, near Public Market",
      timestamp: "2025-01-17 12:45:00",
      reportedBy: "Maria Santos",
      hasImage: false,
    },
    {
      id: "ALT-004",
      type: "Seawall break",
      severity: "low",
      rescue: false,
      description: "Seawall break.",
      location: "Zone 3, Sitio Maligaya",
      timestamp: "2025-01-17 11:20:00",
      reportedBy: "Electric Cooperative",
      hasImage: false,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Report Monitoring</h1>
        <p className="text-gray-600 mt-2">Active disaster emergency reports</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl ">
          <p className="text-sm text-gray-600 mb-1">Total Reports</p>
          <p className="text-3xl font-bold text-gray-900">{alerts.length}</p>
          <p className="text-sm text-blue-600 mt-2">↑ 2 new today</p>
        </div>

        <div className="bg-white p-6 rounded-xl ">
          <p className="text-sm text-gray-600 mb-1">High Priority</p>
          <p className="text-3xl font-bold text-gray-900">
            {alerts.filter((a) => a.severity === "high").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl ">
          <p className="text-sm text-gray-600 mb-1">Sea Wall Reports</p>
          <p className="text-3xl font-bold text-gray-900">
            {alerts.filter((a) => a.type === "Seawall break").length}
          </p>
        </div>
      </div>

      {/* Alert Tiles */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Alerts
        </h2>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <AlertTile key={alert.id} {...alert} />
          ))}
        </div>
      </div>
    </div>
  );
}
