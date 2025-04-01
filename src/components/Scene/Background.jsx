import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useAssetsStore from '../../stores/AssetsStore';;

const Background = () => {
  const { scene } = useThree();
  const { getTexture, isLoading } = useAssetsStore();  

  useEffect(() => {
    if (!isLoading) {
      const px = getTexture('/skybox/px.png');
      const nx = getTexture('/skybox/nx.png');
      const py = getTexture('/skybox/py.png');
      const ny = getTexture('/skybox/ny.png');
      const pz = getTexture('/skybox/pz.png');
      const nz = getTexture('/skybox/nz.png');
      
      if (px && nx && py && ny && pz && nz) {
        const cubeTexture = new THREE.CubeTexture();
        
        cubeTexture.images = [
          px.image, nx.image, py.image, 
          ny.image, pz.image, nz.image
        ];
        
        cubeTexture.needsUpdate = true;
        
        scene.background = cubeTexture;
        scene.backgroundIntensity = 1.05;
        scene.backgroundBlurriness = 0;
      
      }
    }
  }, [scene, isLoading]);

  return null;
};

export default Background;