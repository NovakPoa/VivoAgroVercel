import React, { useRef, useEffect, useCallback } from 'react';
import { useGLTFAnimations } from '../../../../../../hooks/useGLTFAnimations';

const MODEL_PATH = '/models/products/GestaoMaquinario/DispositivoGestaoDeMaquinario.glb';

const DispositivoMaquinario = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 3, playSecondAnimation = false, skipProduct = false }) => {
  const meshRef = useRef();
  const { scene, play, jumpToEnd } = useGLTFAnimations(MODEL_PATH, {
    cloneScene: false,
  });

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

export default DispositivoMaquinario;