import { Canvas } from "@react-three/fiber";
import { useState } from "react";

export default function App() {
  const [lightColor, setLightColor] = useState("red");

  const handleClick = () => {
    setLightColor(lightColor === "red" ? "blue" : "red");
  };

  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color={lightColor} position={[0, 0, 5]} />
      <mesh onClick={handleClick}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  );
}