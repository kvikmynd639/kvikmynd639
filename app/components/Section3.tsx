import React from "react";

const projects = [
  {
    title: "Stability Analysis of an Electric Power Grid",
    description:
      "Developed a simulation program in Fortran to analyze power grid stability under different conditions. Implemented MPI for parallel computation and LAPACK for solving linear systems.",
    techStack: "Fortran, LAPACK, MPI",
  },
  {
    title: "Seismic Data Analysis for Geological Studies",
    description:
      "Created a Fortran-based tool to process seismic data and locate geological structures using FFTW for frequency analysis and OpenMP for parallelism.",
    techStack: "Fortran, FFTW, OpenMP",
  },
  {
    title: "Aerodynamic Simulation of an Aircraft Wing",
    description:
      "Built a simulation in Ada to model aerodynamic behavior of aircraft wings. Integrated OpenGL for visualization and OpenMP for parallel computing.",
    techStack: "Ada, GNAT, OpenGL, OpenMP",
  },
  {
    title: "Plasma Physics Simulation for Fusion Reactors",
    description:
      "Simulated plasma behavior in fusion reactors using Fortran. Integrated PETSc for solving non-linear systems and optimized performance with MPI.",
    techStack: "Fortran, LAPACK, PETSc, MPI",
  },
  {
    title: "BeeBots (NVIDIA/DELL Hackathon)",
    description:
      "Designed a swarm intelligence system for autonomous robotic bees using reinforcement learning. Implemented navigation with Raspberry Pi and Arduino.",
    techStack: "Raspberry Pi, Arduino, Reinforcement Learning",
  },
  {
    title: "QuizPlusPlus (QuizUp Revival)",
    description:
      "Revived QuizUp as a web and mobile app. Built the web app with Remix and the mobile app with React Native, integrating Supabase for real-time updates.",
    techStack: "Remix, React Native, Supabase, Docker",
  },
  {
    title: "BeemBus (Weather Talk - Web App)",
    description:
      "Created a social platform for weather-based discussions. Integrated real-time weather APIs and personalized user profiles.",
    techStack: "Vue.js, Node.js, OpenWeather API, TailwindCSS",
  },
  {
    title: "SciPly (Scientific Buddies - Web App)",
    description:
      "Built a collaborative platform for scientists to verify news and work on projects. Powered by Next.js and GraphQL.",
    techStack: "Next.js, PostgreSQL, Supabase, GraphQL, TailwindCSS",
  },
  {
    title: "Herzyn (Android App)",
    description:
      "Designed a productivity app to block distractions with focused modes (Shaolin and Dao). Used Kotlin for native development.",
    techStack: "Kotlin, Android SDK, Firebase, SQLite",
  },
];

export default function Section3() {
  return (
    <div className="relative w-full py-16 bg-gradient-to-b from-blue-50 to-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-bold text-center mb-12 tracking-wide text-blue-800">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start space-y-4"
            >
              <h3 className="text-2xl font-bold text-blue-900">
                {project.title}
              </h3>
              <p className="text-gray-700">{project.description}</p>
              <p className="text-sm text-gray-500">
                <strong>Tech Stack:</strong> {project.techStack}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
