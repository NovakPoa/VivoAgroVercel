import React, { useRef, useEffect, useCallback } from 'react';
import { useGLTFAnimations } from '../../../../../../hooks/useGLTFAnimations';

const MODEL_PATH = '/models/products/ClimaInteligente/EstacaoMeteorologica.glb';

const Estacao = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, playSecondAnimation = false, skipProduct = false }) => {
  const meshRef = useRef();
  const { scene, play, jumpToEnd } = useGLTFAnimations(MODEL_PATH, {
    cloneScene: false,
  });

  useEffect(() => {
    if (!scene) return;

    if (!skipProduct) {
      play('EstacaoMeteorologica-Crescendo', {
        loop: false,
        timeScale: 0.35
      });
    } else {
      jumpToEnd('EstacaoMeteorologica-Crescendo');
      jumpToEnd('EstacaoMeteorologicaVFX-Crescendo');//conferir nome da animaçao
      play('EstacaoMeteorologicaVFX-Loop', { //conferir nome da animaçao
        loop: true,
        timeScale: 0.15,
      });
    }
  }, [scene, skipProduct, play, jumpToEnd]);

  useEffect(() => {
    if (playSecondAnimation) {
      play('EstacaoMeteorologicaVFX-Crescendo', { //conferir nome da animaçao
        loop: false,
        timeScale: 0.35,
        onFinish: onAnimationEnded
      });
    }
  }, [play, playSecondAnimation]);

  const onAnimationEnded = useCallback(() => {
    play('EstacaoMeteorologicaVFX-Loop', { //conferir nome da animaçao
      loop: true,
      timeScale: 0.15,
    });
  }, [play]);

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

export default Estacao;