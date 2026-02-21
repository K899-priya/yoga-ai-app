import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#e7b6b6] px-10 py-4 flex justify-between items-center shadow">

      <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
        YooGA
      </h1>

      <div className="space-x-6 text-gray-700 font-medium">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/posture">Pose</Link>
        <Link to="/live">Class</Link>
        <Link to="/progress">Progress</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}