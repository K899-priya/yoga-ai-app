import PoseDetector from "../components/PoseDetector";

export default function Posture() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Posture Detection</h1>
      <PoseDetector />
    </div>
  );
}