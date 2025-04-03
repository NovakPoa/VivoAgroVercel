import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const MODEL_PATH = '/models/products/AgroCobertura/Antena.glb';

const Antena = ({position}) => {
  const meshRef = useRef();

  const { scene } = useGLTF(MODEL_PATH);
  
  if (!scene) return null;

  return (
    <primitive 
      object={scene} 
      ref={meshRef}
      position={position}
      rotation={[0, 0, 0]}
      scale={1}      
    />
  );
};

export default Antena;