import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { 
  EffectComposer, 
  Bloom,
  ToneMapping,
  BrightnessContrast,
  HueSaturation
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

const PostProcessing = () => {
  const { scene, gl, camera } = useThree();

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, [gl]);

  return (
    <EffectComposer multisampling={8}>

{/*       <Bloom 
        intensity={1.5}
        luminanceThreshold={0.85}
        luminanceSmoothing={0.4}
        height={300}
      /> */}
      
      <BrightnessContrast brightness={0.05} contrast={0.1} />
      <HueSaturation hue={0} saturation={0.0} />
      
    </EffectComposer>
  );
};

export default PostProcessing;