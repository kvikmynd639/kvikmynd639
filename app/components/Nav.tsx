import React from "react";

export default function Navbar() {
  return (
    <div className="fixed top-0 right-4 h-full flex flex-col justify-center items-center space-y-6 z-50">
      {/* Logo */}
      <div className="text-center mb-6">
        
      </div>

      {/* Navigation Buttons */}
      <a
        href="/home"
        className="w-16 h-16 rounded-full bg-[#34B3F1] flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#F15412] transition-all duration-300"
        style={{
          boxShadow: "0px 4px 15px rgba(52, 179, 241, 0.5)", // Blob-like shadow
        }}
      >
        <span className="text-[#EEEEEE] text-lg font-bold">H</span>
      </a>
      <a
        href="/cars"
        className="w-16 h-16 rounded-full bg-[#34B3F1] flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#F15412] transition-all duration-300"
        style={{
          boxShadow: "0px 4px 15px rgba(52, 179, 241, 0.5)", // Blob-like shadow
        }}
      >
        <span className="text-[#EEEEEE] text-lg font-bold">C</span>
      </a>
      <a
        href="/teams"
        className="w-16 h-16 rounded-full bg-[#34B3F1] flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#F15412] transition-all duration-300"
        style={{
          boxShadow: "0px 4px 15px rgba(52, 179, 241, 0.5)", // Blob-like shadow
        }}
      >
        <span className="text-[#EEEEEE] text-lg font-bold">T</span>
      </a>
      <a
        href="/contact"
        className="w-16 h-16 rounded-full bg-[#34B3F1] flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#F15412] transition-all duration-300"
        style={{
          boxShadow: "0px 4px 15px rgba(52, 179, 241, 0.5)", // Blob-like shadow
        }}
      >
        <span className="text-[#EEEEEE] text-lg font-bold">✉</span>
      </a>
    </div>
  );
}
