import React, { useRef, useEffect } from 'react';
import { useGLTFAnimations } from '../../../../../../hooks/useGLTFAnimations';

const MODEL_PATH = '/models/products/ClimaInteligente/EstacaoMeteorologicaMiniatura.glb';

const EstacaoSmall = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  isVisible = false,
  onAnimationOutEnded
}) => {
  const meshRef = useRef();
  const { scene, play } = useGLTFAnimations(MODEL_PATH, {
    cloneScene: false,
  });

  useEffect(() => {
    if (isVisible) {
      if (scene) {
        play('EstacaoMeteorologicaMiniatura_Crescendo', {
          loop: false,
          timeScale: 3.0
        });
        play('EstacaoMeteorologicaMiniatura_Flutuando', {
          loop: true,
          timeScale: 1.0
        });
      }
    } else {
      play('EstacaoMeteorologicaMiniatura_Crescendo', {
        loop: false,
        timeScale: -3.0,
        onFinish: onAnimationOutEnded
      });
    }
  }, [isVisible]);

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

export default EstacaoSmall;