import React, { useRef, useEffect, useState } from "react";

const internships = [
  {
    title: "Internship at iPark",
    description:
      "Led web development using React and TailwindCSS, and created a functional dashboard in Next.js.",
    date: "Oct 2023 - August 2024",
  },
  {
    title: "Internship at Verlab Institute",
    description:
      "Designed apps for medical device localization and health monitoring using Flutter. Contributed to research on AI and machine learning for medical purposes.",
    date: "Jun 2023 - Aug 2023",
  },
  {
    title: "Full Stack Development at Travel Nordix",
    description:
      "Built scalable web apps using React, Sass, and TailwindCSS. Migrated infrastructure to Google Cloud and implemented a Golang backend.",
    date: "Jan 2024 - Present",
  },
  {
    title: "Internship at Atruvia AG GmbH",
    description:
      "Optimizing AI-based workflows for financial systems. Integrating machine learning models into existing software ecosystems. Full stack development in Node.js and Electron.js",
    date: "Jan 2025 - Present",
  },
  {
    title: "Internship at Maon GmbH",
    description:
      "Software Development Intern in Berlin. Worked on scalable software solutions and cloud-native applications.",
    date: "Jul 2025 - Oct 2025",
  },
];

export default function Section2() {
  const [lightPosition, setLightPosition] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / rect.height));
        setLightPosition(scrollProgress * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full py-16 px-6 bg-gradient-to-b from-white to-blue-50 text-gray-900">
      <div ref={timelineRef} className="max-w-6xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-bold text-center mb-12 tracking-wide text-blue-800">
          Internships
        </h2>
        <div className="relative">
          {/* Left-Aligned Line */}
          <div className="absolute top-0 left-6 md:left-10 w-[2px] bg-blue-200 h-full"></div>

          {/* Light Animation */}
          <div
            className="absolute left-6 md:left-10 w-[2px] h-[200px] bg-gradient-to-b from-blue-500 via-blue-300 to-transparent"
            style={{
              top: `${lightPosition}%`,
              transition: "top 0.3s ease-out",
            }}
          ></div>

          {/* Timeline Items */}
          {internships.map((item, index) => (
            <div
              key={index}
              className="mb-12 flex flex-col items-start pl-12 md:pl-20 relative"
            >
              {/* Small Marker */}
              <div className="absolute -left-6 w-4 h-4 bg-white border-2 border-blue-500 rounded-full"></div>

              {/* Content Section */}
              <div className="mt-4 md:mt-0">
                <h3 className="text-lg font-semibold text-blue-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  {item.description}
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
