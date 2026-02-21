import ProgressChart from "../components/ProgressChart";

export default function Progress() {
  return (
    <div className="p-10 min-w-screen">
      <h1 className="text-2xl font-bold mb-4">Your Progress</h1>
      <ProgressChart />
    </div>
  );
}