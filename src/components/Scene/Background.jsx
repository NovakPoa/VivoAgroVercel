import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useAssetsStore from '../../stores/AssetsStore';

const Background = () => {
  const { scene } = useThree();
  const { getTexture, isLoading } = useAssetsStore();

  useEffect(() => {
    if (!isLoading) {
      const skybox = getTexture('/textures/skybox/skybox.jpg');
      skybox.mapping = THREE.EquirectangularReflectionMapping;
      skybox.colorSpace = THREE.SRGBColorSpace;

      scene.background = skybox;
      scene.backgroundRotation = new THREE.Euler(0, 4.3, 0);
      scene.backgroundIntensity = 1;
    }
  }, [isLoading, scene]);

  return null;
};

export default Background;