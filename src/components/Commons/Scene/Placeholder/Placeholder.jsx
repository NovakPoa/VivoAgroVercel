import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Placeholder = ({ position, color = "#660099", opacity = 0.5 }) => {
  const meshRef = useRef();
  
  const cylinderHeight = 20;
  const halfHeight = cylinderHeight / 2;

  const adjustedPosition = [position[0], position[1] + halfHeight, position[2]];

  return (
    <mesh 
      ref={meshRef} 
      position={adjustedPosition} 
    >
      <cylinderGeometry args={[2.5, 0, cylinderHeight, 32]} />
      <meshStandardMaterial 
        color={color}
        transparent={true} 
        opacity={opacity}
        emissive={color}  
        emissiveIntensity={0.5} 
      />
    </mesh>
  );
};

export default Placeholder;