import { useState } from "react";
import { loginUser } from "../services/api";
import { motion as _motion } from "framer-motion";

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
    <div className="min-h-screen min-w-screen bg-linear-to-br from-[#f3c6c6] via-[#f5efe6] to-[#e7b6b6] flex items-center justify-center">

      <_motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/40 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-100"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="w-full bg-linear-to-r from-pink-500 to-orange-400 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
            Login
          </button>

        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Don’t have an account? Sign up
        </p>

      </_motion.div>
    </div>
  );
}