import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { HakurochiScene } from "../components/HakurochiScene";
import Navbar from "../components/Nav";
import Section1 from "~/components/Section1";
import Section2 from "~/components/Section2";
import HakurochiFasterScene from '../components/HakurochiFasterScene';
import Section3 from "~/components/Section3";

// Loader function (even if it does nothing)
export const loader: LoaderFunction = async () => {
  return null; // This satisfies Remix's requirement
};

export const meta: MetaFunction = () => {
  return [
    { title: "Sumeja Buljugija - Portfolio web" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
    <div className="w-full h-screen relative flex flex-col md:flex-row bg-white">
      {/* Navbar */}

      {/* Left Section: 3D Model */}
      <div className="w-full md:w-2/3 h-full flex flex-col md:flex-row items-center justify-center bg-white">
        <HakurochiFasterScene />
      </div>

     {/* Right Section: Text Content */}
<div className="w-full md:w-1/3 h-full flex flex-col items-center md:items-start justify-center px-4 md:px-8 space-y-6 bg-transparent text-center md:text-left">
  {/* Title Section */}
  <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-indigo-950">
    Initial <span className="text-red-600">P</span>ortfolio
  </h1>
  <p className="text-sm md:text-base lg:text-lg text-gray-900">
    On the left, you’ll see where my dreams (and your investment) are
    headed: straight into the garage for my beloved Hachiroku.
  </p>

  {/* Social Links */}
  <div className="flex justify-center md:justify-start space-x-4">
    {["yt", "ig", "fb", "x"].map((platform) => (
      <button
        key={platform}
        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#34B3F1] text-zinc-900 font-bold shadow-lg hover:scale-105 transition-all"
      >
        {platform}
      </button>
    ))}
  </div>

  {/* Stats Section */}
  <div className="grid grid-cols-2 gap-4 md:gap-8 mt-6 md:mt-8 w-full">
    <div className="flex flex-col items-center md:items-start">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">+300</h2>
      <p className="text-sm md:text-base lg:text-lg text-gray-900">
        Websites created for clients and hobby projects.
      </p>
    </div>
    <div className="flex flex-col items-center md:items-start">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">Slope</h2>
      <p className="text-sm md:text-base lg:text-lg text-gray-900">
        climber
      </p>
    </div>
  </div>
</div>

    </div>

    <Section1/>
    <Section2 />
    <Section3 />

    </>
  );
}
