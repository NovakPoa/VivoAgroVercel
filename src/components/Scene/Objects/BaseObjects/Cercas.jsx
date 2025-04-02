import React, { useRef } from 'react';
import { useProcessedModel } from '../../../../hooks/useProcessedModel';

const Cercas = () => {
  const meshRef = useRef();

  const textureMapping = {
    'M_Planks.013': '/models/fazenda/Cercas/Textures/Cerca-arame_CercaMadeira_BaseColor.png',
    'M_Planks.001': '/models/fazenda/Cercas/Textures/acbd.png',
  };
  
  const fbx = useProcessedModel('/models/fazenda/Cercas/Cercas.fbx', textureMapping);
  
  if (!fbx) return null;  
  
  return (
    <primitive 
      object={fbx} 
      ref={meshRef}
/*       position={[3, 0, 3]} 
      rotation={[0, 1.57, 0]} */
      scale={0.01}
    />
  );
};

export default Cercas;