"use client";

export default function Navbar() {
  return (
    <nav className="relative top-0 left-0 w-full z-50 bg-white bg-opacity-90">
      <div className="flex justify-center items-center h-16">
        {/* Navigation Links */}
        <div className="flex space-x-8">
          <a
            href="#home"
            className="text-gray-800 hover:text-indigo-700 text-md font-medium transition"
          >
            Home
          </a>
          <a
            href="#portfolio"
            className="text-gray-800 hover:text-indigo-700 text-md font-medium transition"
          >
            Portfolio
          </a>
         
          <a
            href="#about"
            className="text-gray-800 hover:text-indigo-700 text-md font-medium transition"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-gray-800 hover:text-indigo-700 text-md font-medium transition"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
