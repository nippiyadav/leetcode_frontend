import React from "react";
import { Code, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Master Coding Interviews
        </h2>
        <p className="text-gray-300 max-w-2xl text-lg mb-6">
          Solve coding challenges, prepare for technical interviews, and level
          up your skills with curated problems and competitions.
        </p>
        <button className="bg-yellow-400 text-black px-6 py-2 font-semibold rounded-xl hover:bg-yellow-300 transition">
          <Link to={"/all-problem/page=1&limit=10"}>Get Started</Link>
        </button>
      </section>

      {/* Stats Section */}
      <section className="grid md:grid-cols-3 gap-6 px-6 md:px-20 pb-20">
        <div className="bg-gray-800 rounded-2xl p-6 flex items-center space-x-4 shadow-md">
          <Code className="text-yellow-400 w-8 h-8" />
          <div>
            <p className="text-xl font-semibold">2500+</p>
            <p className="text-gray-400 text-sm">Coding Problems</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 flex items-center space-x-4 shadow-md">
          <Trophy className="text-yellow-400 w-8 h-8" />
          <div>
            <p className="text-xl font-semibold">Monthly</p>
            <p className="text-gray-400 text-sm">Coding Contests</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 flex items-center space-x-4 shadow-md">
          <Users className="text-yellow-400 w-8 h-8" />
          <div>
            <p className="text-xl font-semibold">1M+</p>
            <p className="text-gray-400 text-sm">Active Coders</p>
          </div>
        </div>
      </section>
    </div>
  );
}
