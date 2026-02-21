import { useEffect, useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs";

export default function LiveClass() {
  const videoRef = useRef(null);
  const [feedback, setFeedback] = useState("Starting camera...");

  // START CAMERA
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(err);
      setFeedback("Camera access denied");
    }
  };

  // POSE DETECTION
  const runPoseDetection = async () => {
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet
    );

    setInterval(async () => {
      if (!videoRef.current) return;

      const poses = await detector.estimatePoses(videoRef.current);

      if (poses.length > 0) {
        const keypoints = poses[0].keypoints;

        const leftShoulder = keypoints.find(k => k.name === "left_shoulder");
        const rightShoulder = keypoints.find(k => k.name === "right_shoulder");

        if (leftShoulder && rightShoulder) {
          if (Math.abs(leftShoulder.y - rightShoulder.y) < 20) {
            setFeedback("✅ Pose looks balanced");
          } else {
            setFeedback("❌ Keep shoulders level");
          }
        }
      }
    }, 1000);
  };

  // USE EFFECT AFTER FUNCTIONS
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    startCamera();
    runPoseDetection();
  }, []);

  return (
    <div className="bg-[#f5efe6] min-h-screen min-w-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Live AI Yoga Class</h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* CAMERA */}
        <div>
          <video
            ref={videoRef}
            autoPlay
            className="rounded-lg shadow w-full"
          />

          <p className="mt-4 text-xl font-semibold">{feedback}</p>
        </div>

        {/* REFERENCE IMAGE */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Correct Pose Reference</h2>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Correct Pose"
            className="w-60 mx-auto"
          />

          <p className="text-gray-600 mt-4">
            Keep shoulders aligned and maintain balance.
          </p>
        </div>

      </div>
    </div>
  );
}