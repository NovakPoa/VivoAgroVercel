import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ANIMATION_DURATIONS } from '../../../../config/animationConfig';

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
  isVisible = false,
  onAnimationOutEnded
}) => {
  const groupRef = useRef();
  const meshRef = useRef();
  const materialRef = useRef();
  const [animState, setAnimState] = useState('initial');
  const [currentOpacity, setCurrentOpacity] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  const animStartTimeRef = useRef(0);
  const { clock } = useThree();

  useEffect(() => {
    if (isVisible) {
      const showTimer = setTimeout(() => { 
        setAnimState('visible');
        animStartTimeRef.current = clock.elapsedTime * 1000;
      }, index * 100);
      return () => clearTimeout(showTimer);
    } else if (animState === 'visible') {
      setAnimState('hiding');
      animStartTimeRef.current = clock.elapsedTime * 1000;
    }
  }, [isVisible]);
  
  useEffect(() => {
    if (animState === 'visible' || animState === 'hiding') {
      setAnimating(true);
    }    
    if (animState === 'hiding') {
      const endTimer = setTimeout(() => { if (onAnimationOutEnded) onAnimationOutEnded(); }, ANIMATION_DURATIONS.PLACEHOLDER.SCALE_OUT);
      return () => { clearTimeout(endTimer); };
    }
  }, [animState]);

  useFrame(() => {
    if (!animating || !materialRef.current) return;
    
    const now = clock.elapsedTime * 1000; 
    const elapsed = now - animStartTimeRef.current;
    
    if (animState === 'visible') {
      const progress = Math.min(elapsed / ANIMATION_DURATIONS.PLACEHOLDER.SCALE_IN, 1);
      
      // Animação de opacidade na entrada
      if (OPACITY_IN_ANIMATION) {
        const newOpacity = progress * opacity;
        setCurrentOpacity(newOpacity);
        materialRef.current.opacity = newOpacity;
      }
      
      // Animação de escala na entrada
      if (SCALE_IN_ANIMATION) {
        const newScale = 0.01 + progress * 0.99;
        if (groupRef.current) {
          groupRef.current.scale.set(1, newScale, 1);
        }
      }
      if (progress >= 1) {
        setAnimating(false);
      }      
    }
    else if (animState === 'hiding') {
      const progress = Math.min(elapsed / ANIMATION_DURATIONS.PLACEHOLDER.SCALE_OUT, 1);
      
      // Animação de opacidade na saída
      if (OPACITY_OUT_ANIMATION) {
        const newOpacity = opacity * (1 - progress);
        setCurrentOpacity(newOpacity);
        materialRef.current.opacity = newOpacity;
      }
      
      // Animação de escala na saída
      if (SCALE_OUT_ANIMATION) {
        const newScale = 1 - (progress * 0.99);
        if (groupRef.current) {
          groupRef.current.scale.set(1, newScale, 1);
        }
      }
      if (progress >= 1) {
        setAnimating(false);
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

export const Placeholders = ({ placeholderPositions, isVisible = true, onAnimationOutEnded }) => {
  return (
    <>
      {placeholderPositions.map((position, index) => (
        <Placeholder 
          key={index}
          position={position}
          index={index}
          isVisible={isVisible}
          onAnimationOutEnded={onAnimationOutEnded}
        />
      ))}
    </>    
  );
};

export default Placeholders;