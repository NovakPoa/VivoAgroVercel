import React, { useEffect } from 'react';
import useNeonEffect from '../../../../../hooks/useNeonEffect';
import useIntroStore from '../../../../../stores/IntroStore';

const MODEL_PATH = '/models/neons/NeonCasa.glb';

const IntroNeon = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  instanceCount = 5,
  instanceOffset = [0.14, 0, 0],
  instanceOpacities = [0.1, 0.3, 0.1, 0.8, 0.1],
  animationDuration = 6,
  fadeOutDuration = 1,
  useXCoord = false,
  invertDirection = false,
  bloomStrength = 3.0
}) => {
  const { setIntroNeonVisibility } = useIntroStore();

  const { modelRef, startAnimation } = useNeonEffect({
    modelPath: MODEL_PATH,
    instanceCount,
    instanceOffset,
    instanceOpacities,
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