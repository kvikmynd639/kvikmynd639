"use client";
import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import ToyotaTrueno from "./Hakurochi";
import { useEffect, useState, Suspense } from "react";
import { useSpring, a } from "@react-spring/three";

export const HakurochiScene = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Car animation spring with sharper drift effect
  const { position, rotation } = useSpring({
    position: [scrollPosition * 2, -1.5, 0], // Move right as scroll increases
    rotation: [
      0, // No tilt on x-axis
      Math.PI / 1.35 + scrollPosition * Math.PI / 4, // Sharper lateral rotation along y-axis (45 degrees max increment)
      0, // No z-axis tilt
    ],
    config: {
      mass: 2,
      tension: 200,
      friction: 35, // Enhanced friction for a realistic drift
    },
  });

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Normalize scroll position between 0 and 1
      const normalizedScroll = scrollTop / maxScroll;
      setScrollPosition(normalizedScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isClient) return null;

  return (
    <Canvas
      shadows
      pixelRatio={Math.min(window.devicePixelRatio, 2)}
      camera={{
        position: [6, 2, 6],
        fov: 50,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight
        castShadow
        position={[10, 10, 10]}
        intensity={1}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />

      <Suspense fallback={null}>
        <Stage adjustCamera={false} intensity={0.4} environment="city" resolution={256}>
          {/* Animated Group */}
          <a.group
            rotation={rotation} // Sharper lateral drift effect using y-axis rotation
            scale={0.015}
            position={position} // Animate the car's position
          >
            <ToyotaTrueno isMoving={scrollPosition > 0} />
          </a.group>
        </Stage>
      </Suspense>
    </Canvas>
  );
};

export default HakurochiScene;
