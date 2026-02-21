import { useState } from "react";
import { motion as _motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully ✅");
  };

  return (
    <div className="min-h-screen min-w-screen bg-[#f5efe6] flex items-center justify-center p-6">

      <_motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <textarea
            placeholder="Your Message"
            className="w-full p-3 border rounded-lg h-32"
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <button className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold">
            Send Message
          </button>

        </form>
      </_motion.div>

    </div>
  );
}