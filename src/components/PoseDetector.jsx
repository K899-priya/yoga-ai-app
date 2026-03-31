import { useRef } from "react";
import usePoseDetection from "../hooks/usePoseDetection";

export default function PoseDetector() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { poses } = usePoseDetection(videoRef, canvasRef);

  // 🧠 Simple feedback
  const getFeedback = () => {
    if (!poses || poses.length === 0) return "Detecting...";

    const keypoints = poses[0].keypoints;

    const leftShoulder = keypoints.find(k => k.name === "left_shoulder");
    const rightShoulder = keypoints.find(k => k.name === "right_shoulder");

    if (!leftShoulder || !rightShoulder) return "Adjust position";

    const diff = Math.abs(leftShoulder.y - rightShoulder.y);

    if (diff < 20) return "✅ Good posture";
    if (diff < 50) return "⚠️ Adjust shoulders";
    return "❌ Fix posture";
  };

  return (
    <div className="text-center p-6">

      <h1 className="text-2xl font-bold mb-4">AI Pose Detector 🧘</h1>

      {/* 🎥 VIDEO + CANVAS */}
      <div className="relative inline-block">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          width="640"
          height="480"
          className="rounded-lg shadow"
        />

        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="absolute top-0 left-0"
        />
      </div>

      {/* 🧠 FEEDBACK */}
      <p className="mt-4 text-xl font-semibold">
        {getFeedback()}
      </p>

      {/* 📊 DEBUG (optional) */}
      <details className="mt-4 text-left max-w-xl mx-auto">
        <summary className="cursor-pointer text-gray-500">
          Show Raw Data
        </summary>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(poses, null, 2)}
        </pre>
      </details>

    </div>
  );
}