import { motion as _motion } from "framer-motion";

export default function Home() {
  return (
    <div className="text-center py-20">
      <_motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold"
      >
        Find Your Balance with AI Yoga
      </_motion.h1>
    </div>
  );
}