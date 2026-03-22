import { useState } from "react";
import { loginUser } from "../services/api";
import { motion as _motion} from "framer-motion";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

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
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-linear-to-br from-[#f3c6c6] via-[#f5efe6] to-[#e7b6b6] relative overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>

      {/* 💎 LOGIN CARD */}
      <_motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white/30 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 w-95"
      >
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-600 mb-6 text-sm">
          Login to continue your yoga journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />

            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 p-3 rounded-lg bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />

            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 p-3 rounded-lg bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* BUTTON */}
          <_motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="w-full bg-linear-to-r from-pink-500 to-orange-400 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition"
          >
            Login
          </_motion.button>

        </form>

        {/* EXTRA LINKS */}
        <div className="text-center mt-5 text-sm text-gray-600">
          Don’t have an account?{" "}
          <span className="text-pink-600 font-semibold cursor-pointer hover:underline">
            Sign up
          </span>
        </div>

      </_motion.div>
    </div>
  );
}