import { useEffect, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs";

export default function usePoseDetection(videoRef) {
  const [poses, setPoses] = useState([]);

  useEffect(() => {
    const run = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet
      );

      setInterval(async () => {
        const detected = await detector.estimatePoses(videoRef.current);
        setPoses(detected);
      }, 1000);
    };

    run();
  }, [videoRef]);

  return { poses };
}