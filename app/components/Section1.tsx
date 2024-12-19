import React from "react";

export default function Section1() {
  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-5xl font-extrabold text-indigo-950 mb-12 text-center">
          Featured Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Card 1 */}
          <div className="relative bg-zinc-100 rounded-lg shadow-lg overflow-hidden border border-gray-300 hover:scale-105 transition-transform">
            <div className="absolute top-4 left-4 text-[#34B3F1] font-bold text-sm">
              01
            </div>
            <div className="p-6 space-y-6">
              {/* Floating Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#34B3F1] to-[#4D5D9C] flex items-center justify-center shadow-md">
                  <img
                    src="/imgs/mycat.png"
                    alt="My Cat"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              {/* Card Content */}
              <h3 className="text-2xl font-bold text-gray-900 text-center">
                Svelte portfolio
              </h3>
              <p className="text-sm text-gray-700 text-center">
                Svelte n jQuery implementation
              </p>
              {/* Button */}
              <div className="flex justify-center">
                <a
                  href="#"
                  className="bg-[#34B3F1] text-zinc-900 font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                >
                  View Case
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-zinc-100 rounded-lg shadow-lg overflow-hidden border border-gray-300 hover:scale-105 transition-transform">
            <div className="absolute top-4 left-4 text-[#34B3F1] font-bold text-sm">
              02
            </div>
            <div className="p-6 space-y-6">
              {/* Floating Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#34B3F1] to-[#4D5D9C] flex items-center justify-center shadow-md">
                  <img
                    src="/imgs/quizplusplus.png"
                    alt="Quiz++"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              {/* Card Content */}
              <h3 className="text-2xl font-bold text-gray-900 text-center">
                Quiz++
              </h3>
              <p className="text-sm text-gray-700 text-center">
                Central AI unit managing and optimizing connected components.
              </p>
              {/* Button */}
              <div className="flex justify-center">
                <a
                  href="#"
                  className="bg-[#34B3F1] text-zinc-900 font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                >
                  View Case
                </a>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-zinc-100 rounded-lg shadow-lg overflow-hidden border border-gray-300 hover:scale-105 transition-transform">
            <div className="absolute top-4 left-4 text-[#34B3F1] font-bold text-sm">
              03
            </div>
            <div className="p-6 space-y-6">
              {/* Floating Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#34B3F1] to-[#4D5D9C] flex items-center justify-center shadow-md">
                  <img
                    src="/imgs/initiald.png"
                    alt="Initial D"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              {/* Card Content */}
              <h3 className="text-2xl font-bold text-gray-900 text-center">
                Initial D Tribute
              </h3>
              <p className="text-sm text-gray-700 text-center">
                Create stunning projects effortlessly with AI assistance.
              </p>
              {/* Button */}
              <div className="flex justify-center">
                <a
                  href="#"
                  className="bg-[#34B3F1] text-zinc-900 font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                >
                  View Case
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
