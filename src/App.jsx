import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Posture from "./pages/Posture";
import LiveClass from "./pages/LiveClass";
import Progress from "./pages/Progress";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Join from "./pages/Join";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/posture" element={<Posture />} />
        <Route path="/live" element={<LiveClass />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/join" element={<Join />} />   
      </Routes>

      <Footer />
    </Router>
  );
}