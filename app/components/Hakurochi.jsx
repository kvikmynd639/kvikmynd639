import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function ToyotaTrueno({ isMoving, ...props }) {
  const { nodes, materials } = useGLTF("/toyota_ae86_sprinter_trueno_zenki.glb");

  // References for wheel rotation
  const frontLeftWheel = useRef();
  const frontRightWheel = useRef();
  const rearLeftWheel = useRef();
  const rearRightWheel = useRef();

  // Rotate wheels during animation
  useFrame(() => {
    if (isMoving) {
      const rotationSpeed = 0.1; // Adjust rotation speed as needed
      if (frontLeftWheel.current) {
        frontLeftWheel.current.rotation.x -= rotationSpeed;
        frontRightWheel.current.rotation.x -= rotationSpeed;
        rearLeftWheel.current.rotation.x -= rotationSpeed;
        rearRightWheel.current.rotation.x -= rotationSpeed;
      }
    }
  });

  return (
    <group {...props} dispose={null}>
      {/* Interior */}
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Interior_InteriorPlastic_0.geometry}
          material={materials.InteriorPlastic}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Interior_Interior_0.geometry}
          material={materials.Interior}
        />
      </group>

      {/* Car Body */}
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Trim2_0.geometry}
          material={materials.Trim2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_LampCovers_0.geometry}
          material={materials.LampCovers}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_TailightFrame_0.geometry}
          material={materials.TailightFrame}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Reflector_0.geometry}
          material={materials.Reflector}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Windows_0.geometry}
          material={materials.Windows}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Primary_0.geometry}
          material={materials.Primary}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Secondary_0.geometry}
          material={materials.Secondary}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Trim1_0.geometry}
          material={materials.Trim1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Trueno_0.geometry}
          material={materials.Trueno}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Mirror_0.geometry}
          material={materials.Mirror}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Shadow_0.geometry}
          material={materials.Shadow}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_LicensePlate_0.geometry}
          material={materials.LicensePlate}
        />
      </group>

      {/* Headlights */}
      <group position={[48.349, 73.422, 178.47]} rotation={[-2.697, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Headlights_Trim2_0.geometry}
          material={materials.Trim2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Headlights_LampCovers_0.geometry}
          material={materials.LampCovers}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Headlights_Reflector_0.geometry}
          material={materials.Reflector}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Headlights_Primary_0.geometry}
          material={materials.Primary}
        />
      </group>

      {/* Wheels */}
      <group position={[70.95, 31.714, 122.539]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          ref={frontLeftWheel}
          castShadow
          receiveShadow
          geometry={nodes.FL_Wheel_TireMaterial_0.geometry}
          material={materials.TireMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FL_Wheel_RimMaterial_0.geometry}
          material={materials.RimMaterial}
        />
      </group>
      <group position={[-70.95, 31.714, 122.538]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          ref={frontRightWheel}
          castShadow
          receiveShadow
          geometry={nodes.FR_Wheel_TireMaterial_0.geometry}
          material={materials.TireMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FR_Wheel_RimMaterial_0.geometry}
          material={materials.RimMaterial}
        />
      </group>
      <group position={[70.95, 31.714, -116.37]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          ref={rearLeftWheel}
          castShadow
          receiveShadow
          geometry={nodes.RL_Wheel_TireMaterial_0.geometry}
          material={materials.TireMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RL_Wheel_RimMaterial_0.geometry}
          material={materials.RimMaterial}
        />
      </group>
      <group position={[-70.95, 31.714, -116.371]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          ref={rearRightWheel}
          castShadow
          receiveShadow
          geometry={nodes.RR_Wheel_TireMaterial_0.geometry}
          material={materials.TireMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RR_Wheel_RimMaterial_0.geometry}
          material={materials.RimMaterial}
        />
      </group>

      {/* Steering Wheel */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SteeringWheel_SteeringWheel_0.geometry}
        material={materials.SteeringWheel}
        position={[-36.68, 76.22, 30.484]}
        rotation={[-2.816, 0, -Math.PI]}
        scale={2.764}
      />

      {/* Brake Calipers */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FL_Caliper_BrakeCaliper_0.geometry}
        material={materials.BrakeCaliper}
        position={[64.097, 31.715, 122.542]}
        rotation={[0, Math.PI / 2, 0]}
        scale={11.35}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FR_Caliper_BrakeCaliper_0.geometry}
        material={materials.BrakeCaliper}
        position={[-64.097, 31.715, 122.536]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[-11.35, 11.35, 11.35]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RL_Caliper_BrakeCaliper_0.geometry}
        material={materials.BrakeCaliper}
        position={[64.097, 31.715, -116.367]}
        rotation={[0, Math.PI / 2, 0]}
        scale={11.35}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RR_Caliper_BrakeCaliper_0.geometry}
        material={materials.BrakeCaliper}
        position={[-64.097, 31.715, -116.373]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[-11.35, 11.35, 11.35]}
      />
    </group>
  );
}

useGLTF.preload("/toyota_ae86_sprinter_trueno_zenki.glb");
