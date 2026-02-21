import { motion as _motion} from "framer-motion";

export default function Join() {
  return (
    <div className="min-h-screen min-w-screen bg-linear-to-br from-[#f3c6c6] to-[#e7b6b6] flex items-center justify-center p-6">

      <_motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center"
      >
        <h1 className="text-3xl font-bold mb-4">Join Yoga AI</h1>

        <p className="text-gray-600 mb-6">
          Start your journey towards better health with AI powered yoga training.
        </p>

        <ul className="text-left mb-6 space-y-2">
          <li>✅ AI posture detection</li>
          <li>✅ Live yoga classes</li>
          <li>✅ Progress tracking</li>
          <li>✅ Personalized plans</li>
        </ul>

        <button className="w-full bg-linear-to-r from-pink-500 to-orange-400 text-white py-3 rounded-lg font-semibold">
          Get Started
        </button>
      </_motion.div>

    </div>
  );
}