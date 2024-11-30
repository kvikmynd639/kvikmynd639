"use client";
import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import ToyotaTrueno from "./Hakurochi";
import { useEffect, useState } from "react";

export const HakurochiScene = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      shadows
      camera={{
        position: [6, 2, 6],
        fov: isMobile ? 60 : 50,
      }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 0, 0);
      }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.7} color="#ffffff" /> {/* Brighter ambient light */}
      <directionalLight
        castShadow
        position={[10, 10, 10]}
        intensity={1.5} // Increase the intensity for a stronger directional light
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" /> {/* Additional light for depth */}

      <Stage adjustCamera={false} intensity={0.5} environment="city">
        <group
          rotation={[0, Math.PI / 1.35, 0]}
          scale={isMobile ? 0.015 : 0.022}
          position={[0, -1.5, 0]}
        >
          <ToyotaTrueno />
        </group>
      </Stage>
    </Canvas>
  );
};

export default HakurochiScene;

