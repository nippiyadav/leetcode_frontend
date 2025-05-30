import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-.5 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand/Logo */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">LeetPro</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Your daily dose of coding problems to prepare for real-world technical interviews.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-problem" className="hover:text-yellow-400 transition">
                All Problems
              </Link>
            </li>
            <li>
              <Link to="/problem-create" className="hover:text-yellow-400 transition">
                Create Problem
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact or future items */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Get In Touch</h3>
          <p className="text-gray-400 text-sm">
            Have ideas or feedback? Reach out to us through our contact page or GitHub (coming soon).
          </p>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8 text-sm">
        © {new Date().getFullYear()} LeetPro. All rights reserved.
      </div>
    </footer>
  );
}
