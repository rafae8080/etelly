export default function DamMonitoringPage() {
  // Sample data for Observe WL table
  const observeData = {
    current: 78.82,
    min30: 79.82,
    hr1: 79.82,
    hr2: 79.82,
    timestamp: "2026-01-25 21:50",
  };

  // Sample data for Dam Water Level Update table
  const damWaterLevelData = [
    {
      id: 1,
      time: "08:00 AM",
      date: "Jan-25",
      reservoirWaterLevel: 79.81,
      waterLevelHr: 24,
      waterLevelAmount: 0.01,
      normalHighWater: 80.15,
      deviationNHWL: -0.34,
      ruleCurveElevation: 0.0,
      deviationRuleCurve: 0.0,
      gateOpeningGates: "",
      gateOpeningMeters: "",
      estimatedInflow: "",
      estimatedOutflow: "",
      highlight: true, // Change to false to remove green background
    },
    {
      id: 2,
      time: "08:00 AM",
      date: "Jan-24",
      reservoirWaterLevel: 79.8,
      waterLevelHr: "",
      waterLevelAmount: "",
      normalHighWater: "",
      deviationNHWL: -0.35,
      ruleCurveElevation: 0.0,
      deviationRuleCurve: 0.0,
      gateOpeningGates: "",
      gateOpeningMeters: "",
      estimatedInflow: "",
      estimatedOutflow: "",
      highlight: false, // Change to true to add green background
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dam Monitoring</h1>

        {/* Dam Selector */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-900">La Mesa Dam</span>
        </div>
      </div>

      {/* Observe WL(EL.m) Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Observe WL(EL.m)
          </h2>
          <span className="text-sm text-gray-600">
            Time: {observeData.timestamp}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-red-700 text-white">
                <th className="px-4 py-3 text-center font-semibold border border-red-600">
                  Current
                </th>
                <th className="px-4 py-3 text-center font-semibold border border-red-600">
                  -30 min
                </th>
                <th className="px-4 py-3 text-center font-semibold border border-red-600">
                  -1hr
                </th>
                <th className="px-4 py-3 text-center font-semibold border border-red-600">
                  -2hr
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="px-4 py-3 text-center border border-gray-300">
                  {observeData.current}
                </td>
                <td className="px-4 py-3 text-center border border-gray-300">
                  {observeData.min30}
                </td>
                <td className="px-4 py-3 text-center border border-gray-300">
                  {observeData.hr1}
                </td>
                <td className="px-4 py-3 text-center border border-gray-300">
                  {observeData.hr2}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dam Water Level Update Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Dam Water Level Update
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-max">
            <thead>
              <tr className="bg-red-700 text-white">
                <th
                  className="px-3 py-3 text-center text-xs font-semibold border border-red-600"
                  rowSpan={2}
                >
                  Observation
                  <br />
                  Time & Date
                  <br />
                  Level
                  <br />
                  (RWL)(m)
                </th>
                <th
                  className="px-3 py-3 text-center text-xs font-semibold border border-red-600"
                  colSpan={2}
                >
                  Reservoir
                  <br />
                  Water
                  <br />
                  Level
                </th>
                <th
                  className="px-3 py-3 text-center text-xs font-semibold border border-red-600"
                  rowSpan={2}
                >
                  Water Level
                  <br />
                  Deviation
                </th>
                <th
                  className="px-3 py-3 text-center text-xs font-semibold border border-red-600"
                  rowSpan={2}
                >
                  Normal
                  <br />
                  High
                  <br />
                  Water
                </th>
                <th
                  className="px-3 py-3 text-center text-xs font-semibold border border-red-600"
                  rowSpan={2}
                >
                  Deviation
                  <br />
                  from
                  <br />
                  NHWL(m)
                </th>
                <th
                  className="px-3 py-3 text-center text-xs font-semibold border border-red-600"
                  rowSpan={2}
                >
                  Rule
                  <br />
                  Curve
                  <br />
                  Elevation
                  <br />
                  (m)
                </th>
                <th
                  className="px-3 py-3 text-center text-xs font-semibold border border-red-600"
                  rowSpan={2}
                >
                  Deviation
                  <br />
                  form Rule
                  <br />
                  Curve(m)
                </th>
                <th
                  className="px-3 py-3 text-center text-xs font-semibold border border-red-600"
                  colSpan={2}
                >
                  Gate Opening
                </th>
                <th
                  className="px-3 py-3 text-center text-xs font-semibold border border-red-600"
                  colSpan={2}
                >
                  Estimated (cms)
                </th>
              </tr>
              <tr className="bg-red-700 text-white">
                <th className="px-3 py-2 text-center text-xs font-semibold border border-red-600">
                  Hr
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold border border-red-600">
                  Amount
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold border border-red-600">
                  Gates
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold border border-red-600">
                  Meters
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold border border-red-600">
                  Inflow
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold border border-red-600">
                  Outflow
                </th>
              </tr>
            </thead>
            <tbody>
              {damWaterLevelData.map((row) => (
                <tr
                  key={row.id}
                  className={row.highlight ? "bg-green-100" : "bg-white"}
                >
                  {/* Change bg-green-100 to another color like bg-yellow-100, bg-blue-100, etc. to change highlight color */}
                  <td className="px-3 py-3 text-center text-sm border border-gray-300">
                    <div>{row.time}</div>
                    <div>{row.date}</div>
                  </td>
                  <td className="px-3 py-3 text-center text-sm border border-gray-300">
                    {row.waterLevelHr}
                  </td>
                  <td className="px-3 py-3 text-center text-sm border border-gray-300">
                    {row.waterLevelAmount}
                  </td>
                  <td className="px-3 py-3 text-center text-sm border border-gray-300 bg-green-100">
                    {/* Change bg-green-100 to change this cell's highlight color */}
                    {row.reservoirWaterLevel}
                  </td>
                  <td className="px-3 py-3 text-center text-sm border border-gray-300 bg-green-100">
                    {/* Change bg-green-100 to change this cell's highlight color */}
                    {row.normalHighWater}
                  </td>
                  <td className="px-3 py-3 text-center text-sm border border-gray-300">
                    {row.deviationNHWL}
                  </td>
                  <td className="px-3 py-3 text-center text-sm border border-gray-300 bg-green-100">
                    {/* Change bg-green-100 to change this cell's highlight color */}
                    {row.ruleCurveElevation.toFixed(2)}
                  </td>
                  <td className="px-3 py-3 text-center text-sm border border-gray-300 bg-green-100">
                    {/* Change bg-green-100 to change this cell's highlight color */}
                    {row.deviationRuleCurve.toFixed(2)}
                  </td>
                  <td className="px-3 py-3 text-center text-sm border border-gray-300">
                    {row.gateOpeningGates}
                  </td>
                  <td className="px-3 py-3 text-center text-sm border border-gray-300">
                    {row.gateOpeningMeters}
                  </td>
                  <td className="px-3 py-3 text-center text-sm border border-gray-300">
                    {row.estimatedInflow}
                  </td>
                  <td className="px-3 py-3 text-center text-sm border border-gray-300">
                    {row.estimatedOutflow}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
