import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';

const MODEL_PATH = '/models/products/BigButton.glb';

const BigButton = ({ onClick, position = [0, 0, 0] }) => {
  const meshRef = useRef();
  const { scene } = useGLTF(MODEL_PATH);
  const [hovered, setHovered] = useState(false);
  
  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };
  
  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  if (!scene) return null;
  
  // Aplicar efeito de escala quando hover
  const scale = hovered ? 1.1 : 1;
  
  return (
    <primitive 
      object={scene} 
      ref={meshRef}
      position={position}
      rotation={[0, 0, 0]}
      scale={scale}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
};

export default BigButton;