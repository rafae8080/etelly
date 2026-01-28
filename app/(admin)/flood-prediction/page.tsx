"use client";

export default function FloodPredictionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Flood Prediction</h1>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="relative h-87.5 w-full rounded-lg overflow-hidden">
          {/* Google Maps Embed */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25447.630494827325!2d120.90371949757723!3d14.692432804232856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b499f04aaccd%3A0x1d5152fd176eb12a!2sTanza%201%2C%20Navotas%2C%20Metro%20Manila!5e1!3m2!1sen!2sph!4v1769610391992!5m2!1sen!2sph"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />

          {/* Zoom Controls */}
          <div className="absolute left-3 top-3 flex flex-col gap-2 z-10">
            <button className="w-8 h-8 rounded bg-white border shadow text-lg hover:bg-gray-50 transition-colors">
              +
            </button>
            <button className="w-8 h-8 rounded bg-white border shadow text-lg hover:bg-gray-50 transition-colors">
              −
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Rainfall</h2>
          <span className="text-sm text-gray-500">Time: 2026-01-25 21:50</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="bg-red-700 text-white">
                <th className="p-3">Station Name</th>
                <th className="p-3">Current (mm)</th>
                <th className="p-3">30 min</th>
                <th className="p-3">1 hr</th>
                <th className="p-3">3 hr</th>
                <th className="p-3">Risk Level</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="p-3">Tanza North</td>
                <td>12.0</td>
                <td>18.5</td>
                <td>28.0</td>
                <td>45.5</td>
                <td className="font-bold text-red-600">HIGH</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Tanza South</td>
                <td>10.5</td>
                <td>15.0</td>
                <td>25.0</td>
                <td>38.0</td>
                <td className="font-bold text-red-600">HIGH</td>
              </tr>
              <tr>
                <td className="p-3">Panghulo</td>
                <td>8.0</td>
                <td>12.0</td>
                <td>18.5</td>
                <td>32.0</td>
                <td className="font-bold text-orange-500">MEDIUM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
