import React, { useEffect } from 'react';
import useNeonEffect from '../../../../../hooks/useNeonEffect';

const MODEL_PATH = '/models/products/AgroCobertura/AgroNeon.glb';

const AgroNeon = ({ 
  position = [8, 6, 5], 
  rotation = [0, 3.14, 0], 
  scale = [3, 1, 1], 
  animationDuration = 6,
  fadeOutDuration = 1, 
  useXCoord = true,
  invertDirection = false,
  bloomStrength = 2.0
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
    //onFadeOutComplete: () => setIntroNeonVisibility(false)
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

export default AgroNeon;