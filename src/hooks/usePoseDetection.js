import { useEffect, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs";

export default function usePoseDetection(videoRef, canvasRef) {
  const [poses, setPoses] = useState([]);

  useEffect(() => {
    let interval;

    const run = async () => {
      try {
        // 🎥 Start Camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // 🤖 Load Model
        const detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
        );

        // 🔁 Detection Loop
        interval = setInterval(async () => {
          const video = videoRef.current;

          if (!video) return;

          const detected = await detector.estimatePoses(video);
          setPoses(detected);

          // 🎨 Draw Skeleton
          if (canvasRef?.current && detected.length > 0) {
            const ctx = canvasRef.current.getContext("2d");

            ctx.clearRect(0, 0, 640, 480);

            detected[0].keypoints.forEach((kp) => {
              if (kp.score > 0.5) {
                ctx.beginPath();
                ctx.arc(kp.x, kp.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "#00FFAA";
                ctx.fill();
              }
            });
          }
        }, 100);
      } catch (err) {
        console.error("Camera or model error:", err);
      }
    };

    run();

    // 🧹 CLEANUP (VERY IMPORTANT)
    return () => {
      if (interval) clearInterval(interval);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const videoEl = videoRef.current;

      if (videoEl && videoEl.srcObject) {
        videoEl.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoRef, canvasRef]);

  return { poses };
}
