import { useState, useEffect } from "react";
import { motion as _motion } from "framer-motion";

export default function Dashboard() {
  // 🔥 STATES
  const [hydration, setHydration] = useState(65);
  const [steps, setSteps] = useState(8940);
  const [calories, setCalories] = useState(1820);
  const [sessionTime, setSessionTime] = useState(35);
  const [day, setDay] = useState("");

  // 🧠 GET CURRENT DAY
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDay(today);
  }, []);

  // ➕ START SESSION BUTTON
  const startSession = () => {
    setSessionTime(prev => prev + 5);
    setSteps(prev => prev + 200);
    setCalories(prev => prev + 50);
    setHydration(prev => Math.min(prev + 5, 100));
  };

  return (
    <div className="bg-[#f5efe6] min-h-screen min-w-screen p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Wellness Dashboard
        </h1>

        <button
          onClick={startSession}
          className="bg-orange-500 text-white px-6 py-3 rounded-full shadow hover:bg-orange-600 transition"
        >
          Session +
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* CALM TIME */}
        <_motion.div
          className="bg-[#f0d2a6] rounded-2xl p-6 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2906/2906490.png"
            alt="Yoga"
            className="w-40 mb-4"
          />
          <h2 className="text-xl font-semibold">Calm Time</h2>
          <p className="text-3xl font-bold">{sessionTime} m</p>
          <p className="text-gray-600">{day}</p>
        </_motion.div>

        {/* HYDRATION */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-3">Hydration</h3>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${hydration}%` }}
            ></div>
          </div>

          <p className="mt-2 text-right font-bold">{hydration}%</p>

          <div className="mt-4">
            <p className="text-gray-500">Calories</p>
            <p className="text-xl font-semibold">{calories} kcal</p>
          </div>
        </div>

        {/* STEPS */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold">Steps Today</h3>
          <p className="text-3xl font-bold mt-2">{steps.toLocaleString()}</p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3043/3043888.png"
            alt="Steps"
            className="w-20 mt-4"
          />
        </div>

        {/* SCHEDULE */}
        <div className="bg-white rounded-2xl p-6 shadow col-span-2">
          <h3 className="text-lg font-semibold">{day}</h3>
          <h2 className="text-2xl font-bold mb-4">Calm Time</h2>

          <div className="flex justify-between">
            <p>10:00</p>
            <p>11:30</p>
          </div>
        </div>

        {/* MINDFULNESS */}
        <div className="bg-[#e8e0d2] rounded-2xl p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Mindfulness Stats</h3>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Meditation"
            className="w-24 opacity-70"
          />

          <p className="mt-4 text-gray-700 text-sm text-center">
            Stay consistent for better mental clarity 🧘
          </p>
        </div>

      </div>
    </div>
  );
}