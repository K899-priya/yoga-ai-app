import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ProgressCard() {
  // 📊 SAMPLE DATA (you can replace with API later)
  const data = [
    { day: "Mon", accuracy: 60 },
    { day: "Tue", accuracy: 70 },
    { day: "Wed", accuracy: 65 },
    { day: "Thu", accuracy: 80 },
    { day: "Fri", accuracy: 85 },
    { day: "Sat", accuracy: 75 },
    { day: "Sun", accuracy: 90 },
  ];

  return (
    <div className="bg-white shadow-xl p-6 rounded-2xl">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Progress Chart 📊
      </h2>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}