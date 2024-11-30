import React from "react";

export default function Section1() {
  return (
    <div className="w-full py-16 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-5xl font-extrabold text-[#EEEEEE] mb-12">
          Featured Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Card 1 */}
          <div className="relative bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
            <div className="absolute top-4 left-4 text-[#34B3F1] font-bold text-sm">
              01
            </div>
            <div className="p-6 space-y-4">
              {/* Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-r from-[#374785] to-[#4D5D9C] rounded-lg flex items-center justify-center">
                <img src="/imgs/mycat.png" alt="My Cat" className="h-full w-full object-contain" />
              </div>
              {/* Card Content */}
              <h3 className="text-2xl font-bold text-[#EEEEEE]">
                Swesco Maskot
              </h3>
              <p className="text-sm text-[#B5B5C3]">
                Odio tempor dapibus ultrices iaculis massa sapien scelerisque
                molestie.
              </p>
              {/* Button */}
              <div className="mt-4">
                <a
                  href="#"
                  className="bg-[#F15412] text-white font-semibold py-2 px-4 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                >
                  View Case
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
            <div className="absolute top-4 left-4 text-[#34B3F1] font-bold text-sm">
              02
            </div>
            <div className="p-6 space-y-4">
              {/* Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-r from-[#374785] to-[#4D5D9C] rounded-lg flex items-center justify-center">
                <img
                  src="/imgs/quizplusplus.png"
                  alt="Quiz Plus Plus"
                  className="h-full w-full object-contain"
                />
              </div>
              {/* Card Content */}
              <h3 className="text-2xl font-bold text-[#EEEEEE]">Quiz++</h3>
              <p className="text-sm text-[#B5B5C3]">
                Various works: logotypes, flat design, and more.
              </p>
              {/* Button */}
              <div className="mt-4">
                <a
                  href="#"
                  className="bg-[#F15412] text-white font-semibold py-2 px-4 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                >
                  View Case
                </a>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
            <div className="absolute top-4 left-4 text-[#34B3F1] font-bold text-sm">
              03
            </div>
            <div className="p-6 space-y-4">
              {/* Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-r from-[#374785] to-[#4D5D9C] rounded-lg flex items-center justify-center">
                <img
                  src="/imgs/initiald.png"
                  alt="Initial D"
                  className="h-full w-full object-contain"
                />
              </div>
              {/* Card Content */}
              <h3 className="text-2xl font-bold text-[#EEEEEE]">
                Initial D Tribute
              </h3>
              <p className="text-sm text-[#B5B5C3]">
                A heartfelt project inspired by the legendary Initial D.
              </p>
              {/* Button */}
              <div className="mt-4">
                <a
                  href="#"
                  className="bg-[#F15412] text-white font-semibold py-2 px-4 rounded-full flex items-center justify-center transition-transform hover:scale-105"
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
