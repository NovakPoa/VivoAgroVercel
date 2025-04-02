import React, { useRef } from 'react';
import { useProcessedModel } from '../../../../hooks/useProcessedModel';

const Casa = () => {
  const meshRef = useRef();

  const textureMapping = {
    'Sede-madeira-bordas': '/models/fazenda/Casa/Textures/Sede-Madeira-Bordas-Bake.png',
    'Material': '/models/fazenda/Casa/Textures/madeira-clara_Bake.png',
  };

  const fbx = useProcessedModel('/models/fazenda/Casa/Casa.fbx', textureMapping);
  
  if (!fbx) return null;
  
  return (
    <primitive 
      object={fbx} 
      ref={meshRef}
/*       position={[0, 0, -5]}
      rotation={[0, 1.55, 0]} */
      scale={0.02}
    />
  );
};

export default Casa;