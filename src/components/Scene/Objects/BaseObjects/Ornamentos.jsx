import React, { useRef } from 'react';
import { useProcessedModel } from '../../../../hooks/useProcessedModel';

const Ornamentos = () => {
  const meshRef = useRef();

  const textureMapping = {
    'Marble': '/models/fazenda/Ornamentos/Textures/Balde_Bake.png',
    'Plants_Set_cone': '/models/fazenda/Ornamentos/Textures/Image_12.png',
    'Material.001': '/models/fazenda/Ornamentos/Textures/Balde_Bake.png',
    'Plants_Set_leaf_2': '/models/fazenda/Ornamentos/Textures/Image_12.png',
  };
  
  const fbx = useProcessedModel('/models/fazenda/Ornamentos/Ornamentos-2.fbx', textureMapping);

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

export default Ornamentos;