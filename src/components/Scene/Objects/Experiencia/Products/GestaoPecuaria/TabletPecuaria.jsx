import React, { useRef, useEffect, useState } from 'react';
import { useGLTFAnimations } from '../../../../../../hooks/useGLTFAnimations';

const MODEL_PATH = '/models/products/GestaoPecuaria/TabletPecuaria.glb';

const TabletPecuaria = ({position, rotation = [0, 0, 0], scale = 1, animateTablet = false}) => {
  const meshRef = useRef();
  const { scene, playAll, stopAll } = useGLTFAnimations(MODEL_PATH, {
    cloneScene: false,
  });

  useEffect(() => {
    if (animateTablet) {
      playAll({ 
        loop: false, 
      });
    }
  }, [animateTablet]);
    
  if (!scene) return null;

  return (
    <primitive 
      object={scene} 
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}     
    />
  );
};

export default TabletPecuaria;