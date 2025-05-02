import React, { useEffect } from 'react';
import useNeonEffect from '../../../../../../hooks/useNeonEffect';

const MODEL_PATH = '/models/products/ClimaInteligente/ClimaNeon.glb';

const ClimaNeon = ({ 
  position = [0, 6, 13], 
  rotation = [0, 1.14, 0], 
  scale = [3, 1, 1], 
  animationDuration = 6,
  fadeOutDuration = 1, 
  useXCoord = true,
  invertDirection = false,
  bloomStrength = 2.0,
  onAnimationEnd = () => {}
}) => {
  
  const { modelRef, startAnimation } = useNeonEffect({
    modelPath: MODEL_PATH,
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

export default ClimaNeon;