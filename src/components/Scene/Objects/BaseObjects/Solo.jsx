import React, { useRef } from 'react';
import { useProcessedModel } from '../../../../hooks/useProcessedModel';

const Solo = () => {
  const meshRef = useRef();

  const textureMapping = {
    'Solo-1': '/models/fazenda/Solo/Textures/Solo_Baked-1001.png',
    'Solo-2': '/models/fazenda/Solo/Textures/Solo_Baked-1002.png',
    'Solo-3': '/models/fazenda/Solo/Textures/Solo_Baked-1003.png'
  };
  
  const fbx = useProcessedModel('/models/fazenda/Solo/Solo.fbx', textureMapping);
  
  if (!fbx) return null;

  return (
    <primitive 
      object={fbx} 
      ref={meshRef}
/*       position={[0, 0, 0]}
      rotation={[0, 0, 0]} */
      scale={0.05}
    />
  );
};

export default Solo;