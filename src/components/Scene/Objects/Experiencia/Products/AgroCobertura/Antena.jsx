import React, { useRef, useEffect } from 'react';
import { useGLTFAnimations } from '../../../../../../hooks/useGLTFAnimations';

const MODEL_PATH = '/models/products/AgroCobertura/Antena.glb';

const Antena = ({position, rotation = [0, 0, 0], scale = 1}) => {
  const meshRef = useRef();
  const { scene, play } = useGLTFAnimations(MODEL_PATH, {
    cloneScene: false,
  });

  useEffect(() => {
    if (scene) {
      play('scale-in', { //conferir nome da animaçao
        loop: false, 
        timeScale: 2.4
      });
    }
  }, []);

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

export default Antena;