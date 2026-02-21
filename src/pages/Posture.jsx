import { useState } from "react";

const yogaPoses = {
  Beginner: [
    {
      name: "Mountain Pose (Tadasana)",
      steps: [
        "Stand tall with feet together",
        "Relax shoulders and keep arms at sides",
        "Distribute weight evenly",
        "Take deep breaths",
      ],
      benefits: "Improves posture and balance",
      video: "https://www.youtube.com/embed/2HTvZp5rPrg",
    },
    {
      name: "Child's Pose (Balasana)",
      steps: [
        "Kneel on the floor",
        "Sit back on heels",
        "Stretch arms forward",
        "Rest forehead on mat",
      ],
      benefits: "Relaxes body and mind",
      video: "https://www.youtube.com/embed/wxCz0UNUNeQ",
    },
  ],

  Intermediate: [
    {
      name: "Tree Pose (Vrikshasana)",
      steps: [
        "Stand on one leg",
        "Place foot on inner thigh",
        "Join palms above head",
        "Hold balance",
      ],
      benefits: "Improves focus and balance",
      video: "https://www.youtube.com/embed/Fr5kiIygm0c",
    },
  ],

  Advanced: [
    {
      name: "Crow Pose (Bakasana)",
      steps: [
        "Squat down",
        "Place hands on floor",
        "Lean forward",
        "Lift feet off ground",
      ],
      benefits: "Builds arm strength",
      video: "https://www.youtube.com/embed/B4kNiCWTl7M",
    },
  ],
};

export default function Posture() {
  const [activeCategory, setActiveCategory] = useState("Beginner");

  return (
    <div className="bg-[#f5efe6] min-h-screen min-w-screen p-8">

      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Yoga Pose Library
      </h1>

      {/* CATEGORY BUTTONS */}
      <div className="flex gap-4 mb-8">
        {Object.keys(yogaPoses).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full font-medium ${
              activeCategory === category
                ? "bg-green-600 text-white"
                : "bg-white shadow"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* POSES */}
      <div className="grid md:grid-cols-2 gap-6">
        {yogaPoses[activeCategory].map((pose, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-2xl font-bold mb-3">{pose.name}</h2>

            <p className="text-green-600 font-medium mb-2">
              Benefits: {pose.benefits}
            </p>

            <h3 className="font-semibold mb-2">Steps:</h3>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              {pose.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>

            {/* VIDEO */}
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src={pose.video}
                title={pose.name}
                allowFullScreen
              ></iframe>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}