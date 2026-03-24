import { useEffect, useRef, useState, useCallback } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs";

export default function LiveClass() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const [feedback, setFeedback] = useState("Starting camera...");
  const [accuracy, setAccuracy] = useState(0);
  const [poseName, setPoseName] = useState("Detecting...");

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

  // 🎨 DRAW SKELETON
  const drawSkeleton = (keypoints, ctx) => {
    ctx.clearRect(0, 0, 640, 480);

    keypoints.forEach((kp) => {
      if (kp.score > 0.5) {
        ctx.beginPath();
        ctx.arc(kp.x, kp.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#00FFAA";
        ctx.fill();
      }
    });
  };

  // 🧠 POSE RECOGNITION
  const detectPose = (keypoints) => {
    const leftWrist = keypoints.find(k => k.name === "left_wrist");
    const rightWrist = keypoints.find(k => k.name === "right_wrist");
    const leftShoulder = keypoints.find(k => k.name === "left_shoulder");
    const rightShoulder = keypoints.find(k => k.name === "right_shoulder");
    const leftAnkle = keypoints.find(k => k.name === "left_ankle");
    const rightAnkle = keypoints.find(k => k.name === "right_ankle");

    if (!leftShoulder || !rightShoulder) return "Detecting...";

    // 🌳 TREE POSE
    if (leftAnkle && rightAnkle && leftAnkle.y < rightAnkle.y - 50) {
      return "Tree Pose 🌳";
    }

    // 🦸 WARRIOR POSE
    if (
      leftWrist && rightWrist &&
      leftWrist.y < leftShoulder.y &&
      rightWrist.y < rightShoulder.y
    ) {
      return "Warrior Pose ⚔️";
    }

    // 🧘 MOUNTAIN POSE
    if (Math.abs(leftShoulder.y - rightShoulder.y) < 20) {
      return "Mountain Pose 🧘";
    }

    return "Unknown Pose";
  };

  // 📊 ACCURACY
  const calculateAccuracy = (leftShoulder, rightShoulder) => {
    const diff = Math.abs(leftShoulder.y - rightShoulder.y);
    const score = Math.max(0, 100 - diff * 2);

    const rounded = Math.round(score);
    setAccuracy(rounded);

    if (rounded > 80) {
      setFeedback("✅ Excellent posture!");
    } else if (rounded > 50) {
      setFeedback("⚠️ Adjust slightly");
    } else {
      setFeedback("❌ Fix your posture");
    }
  };

  // 🤖 DETECTION LOOP
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

        // 🔥 POSE DETECTION
        const pose = detectPose(keypoints);
        setPoseName(pose);

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
      if (intervalRef.current) clearInterval(intervalRef.current);

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
          <video ref={videoRef} autoPlay playsInline width="640" height="480" className="rounded-lg shadow" />
          <canvas ref={canvasRef} width="640" height="480" className="absolute top-0 left-0" />

          <p className="mt-4 text-xl font-semibold">{feedback}</p>
        </div>

        {/* STATS */}
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-xl font-bold mb-4">Performance</h2>

          <div className="text-2xl font-semibold mb-2 text-blue-600">
            {poseName}
          </div>

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
        </div>

      </div>
    </div>
  );
}