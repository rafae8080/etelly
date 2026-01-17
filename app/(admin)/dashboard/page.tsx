import DashboardCard from "@/components/admin/DashboardCard";
import {
  Bell,
  Map,
  Waves,
  MapPin,
  Package,
  Users,
  Volume2,
} from "lucide-react";

export default function DashboardPage() {
  const modules = [
    {
      title: "Alerts",
      description: "Manage disaster alerts and view reports",
      icon: Bell,
      href: "/alerts",
      color: "bg-red-500",
    },
    {
      title: "Reports",
      description: "Manage disaster alerts and view reports",
      icon: Volume2,
      href: "/reports",
      color: "bg-red-500",
    },
    {
      title: "Hazard Mapping",
      description: "Manual confirm hazard incidents",
      icon: Map,
      href: "/hazard-map",
      color: "bg-orange-500",
    },
    {
      title: "Flood Prediction",
      description: "View areas likely to be flooded",
      icon: Waves,
      href: "/flood-prediction",
      color: "bg-blue-500",
    },
    {
      title: "Evacuation Centers",
      description: "Manage evacuation center locations",
      icon: MapPin,
      href: "/evacuation",
      color: "bg-green-500",
    },
    {
      title: "Resources",
      description: "Track resource inventory and updates",
      icon: Package,
      href: "/resources",
      color: "bg-purple-500",
    },
    {
      title: "Community Requests",
      description: "Manage community resource requests",
      icon: Users,
      href: "/community-requests",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Welcome to E-Telly Admin Dashboard - Disaster Preparedness & Community
          Resource Management
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl ">
          <p className="text-sm text-gray-600 mb-1">Total Active Alerts</p>
          <p className="text-3xl font-bold text-gray-900">3</p>
          <p className="text-sm text-blue-600 mt-2">↑ 2 new today</p>
        </div>

        <div className="bg-white p-6 rounded-xl ">
          <p className="text-sm text-gray-600 mb-1">Available Resources</p>
          <p className="text-3xl font-bold text-gray-900">24</p>
        </div>

        <div className="bg-white p-6 rounded-xl ">
          <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>
      </div>

      {/* Module Cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <DashboardCard key={module.href} {...module} />
          ))}
        </div>
      </div>
    </div>
  );
}
