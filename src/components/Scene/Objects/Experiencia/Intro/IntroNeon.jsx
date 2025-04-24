import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import useIntroStore from '../../../../../stores/IntroStore';

const MODEL_PATH = '/models/intro/IntroNeon.glb';

const IntroNeon = ({ 
  position = [3, 0, 7], 
  rotation = [0, 0, 0], 
  scale = [0.2, 0.2, 0.005], 
  animationSpeed = 5.0,
  fadeDuration = 2.0,
  fadeStartOffset = 10
}) => {

  //if (!scene || !isVisible) return null;

  return (
    <>
    </>
  );
};

export default IntroNeon;