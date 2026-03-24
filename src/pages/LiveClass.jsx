import { useEffect, useRef, useState, useCallback } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs";

export default function LiveClass() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const [feedback, setFeedback] = useState("Starting camera...");
  const [accuracy, setAccuracy] = useState(0);

  // 🎥 START CAMERA
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(err);
      setFeedback("Camera access denied ❌");
    }
  };

  // 🎨 DRAW SKELETON (points + lines)
  const drawSkeleton = (keypoints, ctx) => {
    ctx.clearRect(0, 0, 640, 480);

    // draw points
    keypoints.forEach((kp) => {
      if (kp.score > 0.5) {
        ctx.beginPath();
        ctx.arc(kp.x, kp.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#00FFAA";
        ctx.fill();
      }
    });

    // draw lines (basic connections)
    const pairs = [
      ["left_shoulder", "right_shoulder"],
      ["left_shoulder", "left_elbow"],
      ["left_elbow", "left_wrist"],
      ["right_shoulder", "right_elbow"],
      ["right_elbow", "right_wrist"],
    ];

    pairs.forEach(([p1, p2]) => {
      const kp1 = keypoints.find((k) => k.name === p1);
      const kp2 = keypoints.find((k) => k.name === p2);

      if (kp1 && kp2 && kp1.score > 0.5 && kp2.score > 0.5) {
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.strokeStyle = "#00FFAA";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  };

  // 🧠 ACCURACY CALCULATION
  const calculateAccuracy = (leftShoulder, rightShoulder) => {
    const diff = Math.abs(leftShoulder.y - rightShoulder.y);
    const score = Math.max(0, 100 - diff * 2);

    const rounded = Math.round(score);
    setAccuracy(rounded);

    if (rounded > 80) {
      setFeedback("✅ Excellent posture!");
    } else if (rounded > 50) {
      setFeedback("⚠️ Slight adjustment needed");
    } else {
      setFeedback("❌ Fix your posture");
    }
  };

  // 🤖 POSE DETECTION
  const runPoseDetection = useCallback(async () => {
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet
    );

    intervalRef.current = setInterval(async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) return;

      const poses = await detector.estimatePoses(video);

      if (poses.length > 0) {
        const keypoints = poses[0].keypoints;

        const ctx = canvas.getContext("2d");
        drawSkeleton(keypoints, ctx);

        const leftShoulder = keypoints.find(k => k.name === "left_shoulder");
        const rightShoulder = keypoints.find(k => k.name === "right_shoulder");

        if (leftShoulder && rightShoulder) {
          calculateAccuracy(leftShoulder, rightShoulder);
        }
      }
    }, 100);
  }, []);

  // 🚀 INIT
useEffect(() => {
  const init = async () => {
    await startCamera();
    await runPoseDetection();
  };

  init();

  return () => {
    // clear interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // stop camera safely
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const video = videoRef.current;

    if (video && video.srcObject) {
      video.srcObject.getTracks().forEach(track => track.stop());
    }
  };
}, [runPoseDetection]);

  return (
    <div className="bg-[#f5efe6] min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">AI Yoga Trainer</h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* CAMERA */}
        <div className="relative">
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

          <p className="mt-4 text-xl font-semibold">{feedback}</p>
        </div>

        {/* STATS */}
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-xl font-bold mb-4">Performance</h2>

          <div className="text-5xl font-bold text-green-600">
            {accuracy}%
          </div>

          <p className="mt-2 text-gray-600">Posture Accuracy</p>

          <div className="w-full bg-gray-200 h-4 rounded-full mt-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${accuracy}%` }}
            />
          </div>

          <p className="mt-6 text-gray-700">
            Keep your shoulders aligned and maintain balance.
          </p>
        </div>

      </div>
    </div>
  );
}