import React, { useEffect } from 'react';
import useNeonEffect from '../../../../../../hooks/useNeonEffect';

const MODEL_PATH = '/models/neons/NeonTrator.glb';

const MaquinarioNeon = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  instanceCount = 6,
  instanceOffset = [0, 0.06, 0],
  instanceOpacities = [0.1, 0.3, 0.1, 0.8, 0.2, 0.1],
  animationDuration = 8,
  fadeOutDuration = 1,
  useXCoord = false,
  invertDirection = false,
  bloomStrength = 2.0,
  onAnimationEnd = () => { }
}) => {

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
    onFadeOutComplete: onAnimationEnd
  });

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

export default MaquinarioNeon;