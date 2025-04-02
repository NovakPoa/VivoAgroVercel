import React, { useRef } from 'react';
import { useProcessedModel } from '../../../../hooks/useProcessedModel';

const Galpao = () => {
  const meshRef = useRef();

  const textureMapping = {
    'Galpao-estrutura': '/models/fazenda/Galpao/Textures/Galpao_Baked-1001.png',
    'Galpao-Telhado': '/models/fazenda/Galpao/Textures/Galpao-Telhado_Bake.png',
    'Galpao-interno': '/models/fazenda/Galpao/Textures/Galpao_Baked-1003.png'
  };
  
  const fbx = useProcessedModel('/models/fazenda/Galpao/Galpao.fbx', textureMapping);
  
  if (!fbx) return null;  
  
  return (
    <primitive 
      object={fbx} 
      ref={meshRef}
/*       position={[0, 0, -5]} 
      rotation={[0, 1.55, 0]} */
      scale={0.01}
    />
  );
};

export default Galpao;