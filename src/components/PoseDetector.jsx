import { useRef } from "react";
import usePoseDetection from "../hooks/usePoseDetection";

export default function PoseDetector() {
  const videoRef = useRef();
  const { poses } = usePoseDetection(videoRef);

  return (
    <div className="text-center">
      <video ref={videoRef} autoPlay className="mx-auto rounded-lg" />
      <pre className="text-left mt-4">{JSON.stringify(poses, null, 2)}</pre>
    </div>
  );
}