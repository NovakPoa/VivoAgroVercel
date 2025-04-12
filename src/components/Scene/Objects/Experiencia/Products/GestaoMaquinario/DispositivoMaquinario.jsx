import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const MODEL_PATH = '/models/products/GestaoMaquinario/DispositivoMaquinario.glb';

const DispositivoMaquinario = ({position, rotation = [0, 0, 0], scale = 1}) => {
  const meshRef = useRef();
  const { scene } = useGLTF(MODEL_PATH);
  
  if (!scene) return null;

  return (
    <primitive 
      object={scene.clone()} 
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}     
    />
  );
};

export default DispositivoMaquinario;