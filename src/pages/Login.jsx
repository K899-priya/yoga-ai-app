import { useState } from "react";
import { loginUser } from "../services/api";
import { motion as _motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isOn, setIsOn] = useState(false);

  const toggleLamp = () => {
    setIsOn(!isOn);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      console.log(res.data);
      alert("Login successful 🎉");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div
      className={`min-h-screen min-w-screen flex items-center justify-center relative overflow-hidden transition-all duration-700 ${
        isOn
          ? "bg-linear-to-br from-[#1a1a1a] via-[#2b2b2b] to-black"
          : "bg-black"
      }`}
    >
      {/* 🌟 LIGHT GLOW */}
      <div
        className={`absolute w-100 h-75 rounded-full blur-3xl transition-all duration-700 ${
          isOn ? "bg-yellow-300 opacity-30" : "opacity-0"
        }`}
      />

      {/* 💡 LAMP */}
      <div className="absolute left-20 top-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="w-28 h-16 bg-gray-300 rounded-t-full" />
        <div className="w-2 h-32 bg-gray-300" />

        {/* SWITCH */}
        <div
          onClick={toggleLamp}
          className="w-2 h-10 bg-yellow-500 mt-2 cursor-pointer rounded hover:scale-110 transition"
                  
        />
        <span className="text-2xl animate-bounce pt-2">👆</span>
      </div>

      {/* 👉 CLICK HERE INDICATOR */}
      {!isOn && (
        <_motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="absolute left-36 top-1/2 -translate-y-1/2 flex items-center gap-2 text-yellow-400 font-semibold"
        >
        </_motion.div>
      )}

      {/* 💎 LOGIN CARD */}
      <_motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{
          opacity: isOn ? 1 : 0,
          scale: isOn ? 1 : 0.8,
          y: isOn ? 0 : 50,
        }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 w-96"
      >
        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-300 mb-6 text-sm">
          Login to continue your yoga journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-300" size={18} />

            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-300" size={18} />

            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* BUTTON */}
          <_motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="w-full bg-linear-to-r from-yellow-400 to-yellow-600 text-black py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition"
          >
            Sign In
          </_motion.button>

        </form>

        {/* EXTRA */}
        <div className="text-center mt-5 text-sm text-gray-300">
          Don’t have an account?{" "}
          <span className="text-yellow-400 font-semibold cursor-pointer hover:underline">
            Sign up
          </span>
        </div>
      </_motion.div>
    </div>
  );
}