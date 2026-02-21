import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-10 space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <Link to="/posture" className="block text-green-600">
        Posture Detection
      </Link>

      <Link to="/live" className="block text-green-600">
        Join Live Class
      </Link>

      <Link to="/progress" className="block text-green-600">
        View Progress
      </Link>
    </div>
  );
}