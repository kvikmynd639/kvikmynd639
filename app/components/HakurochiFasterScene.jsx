import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stage } from "@react-three/drei";
import { HakurochiFaster } from "./HakurochiFaster";

export default function HakurochiFasterScene() {
  // State to track if the screen is mobile
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    // Set initial state
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: isMobile ? "60vh" : "90vh", // 90vh for PC, 60vh for mobile
        background: "#cc0000",
      }}
    >
      <Canvas shadows>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[5, 10, 10]}
          intensity={1.5}
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight
          castShadow
          position={[-10, 15, 10]}
          angle={0.3}
          intensity={0.8}
          penumbra={1}
        />

        {/* Stage for Shadows */}
        <Stage
          intensity={1}
          environment="warehouse"
          shadows
          preset="soft"
          adjustCamera={false}
        >
          {/* Model: Rotated based on the screen size */}
          <HakurochiFaster
            rotation={isMobile ? [Math.PI / -2, 0, 0] : [0, Math.PI / 1.6, 0]} // Bird's-eye view for mobile
            position={[0, isMobile ? -1 : -0.5, 0]} // Adjusted position for mobile view
          />
        </Stage>

        {/* Responsive PerspectiveCamera */}
        <PerspectiveCamera
          makeDefault
          position={isMobile ? [0, 10, 0] : [3, 2, 8]} // Slightly less zoomed-in for PC
          fov={isMobile ? 60 : 55} // Wider field of view for PC
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

