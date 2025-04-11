import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const CYLINDER_HEIGHT = 20;

const SCALE_IN_ANIMATION = false;
const OPACITY_IN_ANIMATION = true;

const SCALE_OUT_ANIMATION = false;
const OPACITY_OUT_ANIMATION = true; 

export const Placeholder = ({ 
  position, 
  color = "#660099", 
  opacity = 0.5, 
  index = 0, 
  isVisible = true,
}) => {
  const groupRef = useRef();
  const meshRef = useRef();
  const materialRef = useRef();
  const [animState, setAnimState] = useState('initial');
  const [scale, setScale] = useState(0.01);
  const [currentOpacity, setCurrentOpacity] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      const showTimer = setTimeout(() => {
        setAnimState('visible');
      }, index * 100);
      return () => clearTimeout(showTimer);
    } else if (animState === 'visible') {
      setAnimState('hiding');
    }
  }, [isVisible, animState, index]);
  
  useFrame(() => {
    if (!materialRef.current) return;
    
    if (animState === 'visible') {
      // Animação de opacidade na entrada
      if (OPACITY_IN_ANIMATION && currentOpacity < opacity) {
        const newOpacity = Math.min(currentOpacity + 0.03, opacity);
        setCurrentOpacity(newOpacity);
        materialRef.current.opacity = newOpacity;
      }
      
      // Animação de escala na entrada
      if (SCALE_IN_ANIMATION && scale < 1) {
        const newScale = Math.min(scale + 0.05, 1);
        setScale(newScale);
        if (groupRef.current) {
          groupRef.current.scale.set(1, newScale, 1);
        }
      }
    }

    else if (animState === 'hiding') {
      // Animação de opacidade na saída
      if (OPACITY_OUT_ANIMATION && currentOpacity > 0) {
        const newOpacity = Math.max(currentOpacity - 0.03, 0);
        setCurrentOpacity(newOpacity);
        materialRef.current.opacity = newOpacity;
      }
      
      // Animação de escala na saída
      if (SCALE_OUT_ANIMATION && scale > 0.01) {
        const newScale = Math.max(scale - 0.05, 0.01);
        setScale(newScale);
        if (groupRef.current) {
          groupRef.current.scale.set(1, newScale, 1);
        }
      }
    }
  });

  return (
    <group position={position}>
      <group 
        ref={groupRef} 
        scale={[1, SCALE_IN_ANIMATION ? 0.01 : 1, 1]}
      >
        <mesh 
          ref={meshRef} 
          position={[0, CYLINDER_HEIGHT/2, 0]}
        >
          <cylinderGeometry args={[2.5, 0, CYLINDER_HEIGHT, 32]} />
          <meshStandardMaterial 
            ref={materialRef}
            color={color}
            transparent={true} 
            opacity={currentOpacity}
            emissive={color}  
            emissiveIntensity={0.5} 
          />
        </mesh>
      </group>
    </group>
  );
};

export const Placeholders = ({ placeholderPositions, isVisible = true }) => {
  return (
    <>
      {placeholderPositions.map((position, index) => (
        <Placeholder 
          key={index}
          position={position}
          index={index}
          isVisible={isVisible}
        />
      ))}
    </>    
  );
};

export default Placeholders;