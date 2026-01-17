import AlertTile from "@/components/admin/AlertTile";

export default function AlertsPage() {
  const alerts = [
    {
      type: "Flood",
      severity: "high",
      description: "Heavy flooding reported. Water level rising rapidly.",
      location: "Barangay Santo Niño, Zone 3",
      timestamp: "2025-01-17 14:30:00",
    },
    {
      type: "Fire",
      severity: "high",
      description: "Fire outbreak in Barangay San Isidro.",
      location: "Barangay San Isidro",
      timestamp: "2025-01-17 13:15:00",
    },
    {
      type: "Earthquake",
      severity: "medium",
      description: "Fallen tree blocking main road near the public market.",
      location: "Main Street, near Public Market",
      timestamp: "2025-01-17 12:45:00",
    },
    {
      type: "Seawall break",
      severity: "low",
      description: "Seawall break.",
      location: "Zone 3, Sitio Maligaya",
      timestamp: "2025-01-17 11:20:00",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
        <p className="text-gray-600 mt-2">Active disaster emergency alerts</p>
      </div>

      {/* Alert Tiles */}
      <div>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <AlertTile key={alert.type} {...alert} />
          ))}
        </div>
      </div>
    </div>
  );
}
