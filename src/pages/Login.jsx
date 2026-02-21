import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    console.log(res.data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 space-y-4"
    >
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}