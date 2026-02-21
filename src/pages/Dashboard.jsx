import { motion as _motion} from "framer-motion";

export default function Dashboard() {
  return (
    <div className="bg-[#f5efe6] min-h-screen min-w-screen p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Wellness Dashboard</h1>

        <button className="bg-orange-500 text-white px-6 py-3 rounded-full shadow hover:bg-orange-600 transition">
          Session +
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT BIG CARD */}
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
          <p className="text-3xl font-bold">35 m</p>
          <p className="text-gray-600">Monday</p>
        </_motion.div>

        {/* HYDRATION */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-3">Hydration</h3>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full w-[65%]"></div>
          </div>

          <p className="mt-2 text-right font-bold">65%</p>

          <div className="mt-4">
            <p className="text-gray-500">Breakfast</p>
            <p className="text-xl font-semibold">1820 kcal</p>
          </div>
        </div>

        {/* STEPS */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold">Steps Today</h3>
          <p className="text-3xl font-bold mt-2">8,940</p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3043/3043888.png"
            alt="Steps"
            className="w-20 mt-4"
          />
        </div>

        {/* CALM TIME SCHEDULE */}
        <div className="bg-white rounded-2xl p-6 shadow col-span-2">
          <h3 className="text-lg font-semibold">Monday</h3>
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
        </div>

      </div>
    </div>
  );
}