import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Optional: your custom styles if needed

const drives = [
  {
    id: 1,
    name: "Dadar Beach Cleanup",
    date: "July 5, 2025",
    location: "Dadar Beach, Mumbai",
    image: "/images/dadar.jpg",
    description:
      "Join us at Dadar Beach to protect the coastal ecosystem. Gloves and bags will be provided.",
  },
  {
    id: 2,
    name: "Versova Evening Sweep",
    date: "July 12, 2025",
    location: "Versova Beach, Mumbai",
    image: "/images/versova.jpg",
    description:
      "Our volunteers will cover Versova Beach’s stretch at sunset.",
  },
  {
    id: 3,
    name: "Silver Evening Sweep",
    date: "July 20, 2025",
    location: "Silver Beach, Mumbai",
    image: "/images/versova.jpg",
    description: "Will you join us for making it spectacular again?",
  },
  {
    id: 4,
    name: "Juhu by the Bay",
    date: "August 12, 2025",
    location: "Juhu Beach, Mumbai",
    image: "/images/versova.jpg",
    description:
      "Our volunteers will cover Juhu Beach’s stretch at sunset.",
  },
  {
    id: 5,
    name: "Girgaon Chowpaty Day",
    date: "July 28, 2025",
    location: "Girgaon Chowpaty, Mumbai",
    image: "/images/versova.jpg",
    description: "We will reach on-time. It will be incredible!",
  },
];

const feedbacks = [
  {
    name: "Priya Sharma",
    comment: "Amazing experience! Felt so proud contributing to a clean coastline.",
  },
  {
    name: "Rohit Mehta",
    comment: "The NGO team was super supportive. Will join again next month!",
  },
  {
    name: "Fatima Khan",
    comment: "Loved the community spirit. Highly recommended for all ages.",
  },
];

export default function NGOHome() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [currentFeedback, setCurrentFeedback] = useState(0);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeedback((prev) => (prev + 1) % feedbacks.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-6">

      {/* ✅ HERO SECTION */}
      <div className="text-center py-10 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">
          🌊 ShoreCare NGO Dashboard
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto text-base md:text-lg">
          Beach cleanups made simple, impactful, and community-driven.
        </p>
      </div>

      {/* ✅ Upcoming Beach Drives */}
      <h2 className="text-2xl font-bold mb-4 text-blue-800">
        Upcoming Beach Drives
      </h2>

      <div className="relative mb-16">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-100 z-10"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-3 scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        >
          {drives.map((drive) => (
            <div
              key={drive.id}
              className="min-w-[240px] md:min-w-[260px] bg-white flex-shrink-0 rounded-xl shadow hover:shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src={drive.image}
                alt={drive.name}
                className="w-full h-44 object-cover"
                onClick={() => setExpandedId(expandedId === drive.id ? null : drive.id)}
              />
              <div className="p-4">
                <h3 className="text-lg md:text-xl font-semibold text-blue-900">
                  {drive.name}
                </h3>
                {expandedId === drive.id && (
                  <div className="mt-2 text-gray-700 text-sm md:text-base">
                    <p><strong>Date:</strong> {drive.date}</p>
                    <p><strong>Location:</strong> {drive.location}</p>
                    <p className="mt-1">{drive.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-100 z-10"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ✅ CTA */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-8 md:p-12 rounded-2xl text-center mb-16">
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-blue-900">
          Want to schedule the next drive?
        </h3>
        <p className="mb-4 text-gray-800">Check the stats & plan with ease!</p>
        <button
          onClick={() => navigate("/beach-selection")}
          className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-full shadow hover:bg-blue-800 transition"
        >
          Go to Beach Mapping
        </button>
      </div>

      {/* ✅ Volunteer Voices */}
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-blue-800">
        Volunteer Voices
      </h2>
      <div className="relative mb-16">
        <div className="border p-6 md:p-8 rounded-xl shadow bg-white text-center max-w-3xl mx-auto animate-fade-slide">
          <p className="text-base md:text-lg italic text-gray-800 mb-4">
            “{feedbacks[currentFeedback].comment}”
          </p>
          <p className="text-sm text-blue-800 font-semibold">
            — {feedbacks[currentFeedback].name}
          </p>
        </div>
      </div>

      {/* ✅ Footer */}
      <footer className="text-center text-gray-700 border-t pt-6 pb-8">
        <p className="italic max-w-2xl mx-auto px-4 font-serif text-lg md:text-xl">
          “The greatest threat to our planet is the belief that someone else will save it.”
          <br /> — Robert Swan
        </p>
      </footer>

    </div>
  );
}
