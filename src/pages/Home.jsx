import { motion as _motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#f3c6c6] min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-8 items-center">
        {/* LEFT CONTENT */}
        <_motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Yoga Practice <br /> For Good Health
          </h1>

          <p className="mt-4 text-gray-600 max-w-md">
            Improve flexibility, strength, and mental clarity with our
            AI-powered yoga guidance. Start your journey to better health today.
          </p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate("/join")}
              className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 transition"
            >
              Join Now
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="border border-gray-800 px-6 py-3 rounded hover:bg-gray-800 hover:text-white transition"
            >
              Contact Us
            </button>
          </div>
        </_motion.div>

        {/* RIGHT IMAGE */}
        <_motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0"
            alt="Yoga"
            className="rounded-lg shadow-lg"
          />
        </_motion.div>
      </div>
    </div>
  );
}
