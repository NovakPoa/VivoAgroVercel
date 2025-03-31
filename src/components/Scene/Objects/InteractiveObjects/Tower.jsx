import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Tower = ({ position, onClick, color = "#fff", opacity = 0.5 }) => {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      // Rotação suave para chamar atenção
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      onClick={onClick}
    >
      <cylinderGeometry args={[1, 1, 0.1, 32]} />
      <meshStandardMaterial 
        color={color}
        transparent={true} 
        opacity={opacity} 
      />
    </mesh>
  );
};
export default Tower;