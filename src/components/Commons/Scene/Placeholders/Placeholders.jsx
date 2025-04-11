import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

export const Placeholder = ({ position, color = "#660099", opacity = 0.5, index = 0 }) => {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(0.01); 
  
  const cylinderHeight = 20;
  const halfHeight = cylinderHeight / 2;
  const adjustedPosition = [position[0], position[1] + halfHeight, position[2]];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, index * 100); 
    
    return () => clearTimeout(timer);
  }, [index]);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    if (visible && scale < 1) {
      const newScale = Math.min(scale + 0.05, 1);
      setScale(newScale);
      
      meshRef.current.scale.set(newScale, newScale, newScale);

      if (newScale > 0.9) {
        const bounce = 1 + Math.sin((newScale - 0.9) * 10) * 0.08;
        meshRef.current.scale.set(bounce, newScale, bounce);
      }
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={adjustedPosition}
      scale={[0.01, 0.01, 0.01]}
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

export const Placeholders = ({ placeholderPositions }) => {
  return (
    <>
      {placeholderPositions.map((position, index) => (
        <Placeholder 
          key={index}
          position={position}
          index={index}
        />
      ))}
    </>    
  );
};

export default Placeholders;