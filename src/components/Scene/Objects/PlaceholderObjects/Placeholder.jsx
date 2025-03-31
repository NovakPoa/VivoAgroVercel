import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Placeholder = ({ position, onClick, color = "#660099", opacity = 0.5 }) => {
  const meshRef = useRef();
  
  const cylinderHeight = 30;
  const halfHeight = cylinderHeight / 2;

  const adjustedPosition = [position[0], position[1] + halfHeight, position[2]];

  return (
    <mesh 
      ref={meshRef} 
      position={adjustedPosition} 
      onClick={onClick}
    >
      <cylinderGeometry args={[1.5, 0, 30, 32]} />
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