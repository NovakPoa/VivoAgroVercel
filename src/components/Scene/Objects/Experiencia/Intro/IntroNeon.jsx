import React, { useEffect } from 'react';
import useNeonEffect from '../../../../../hooks/useNeonEffect';
import useIntroStore from '../../../../../stores/IntroStore';

const MODEL_PATH = '/models/neons/NeonCasa.glb';

const IntroNeon = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  animationDuration = 6,
  fadeOutDuration = 1,
  useXCoord = false,
  invertDirection = false,
  bloomStrength = 2.0
}) => {
  const { setIntroNeonVisibility } = useIntroStore();

  const { modelRef, startAnimation } = useNeonEffect({
    modelPath: MODEL_PATH,
    baseColor: '#660099',
    glowColor: '#9933FF',
    useXCoord,
    invertDirection,
    bloomStrength,
    animationDuration,
    fadeOutDuration,
    onFadeOutComplete: () => setIntroNeonVisibility(false)
  });

  // Iniciar animação automaticamente como no código original
  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <group
      ref={modelRef}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

export default IntroNeon;