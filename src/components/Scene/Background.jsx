import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useCubeTexture } from '@react-three/drei';

const Background = () => {
  const { scene } = useThree();
  const texture = useCubeTexture(
    ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    { path: '/textures/' }
  );

  useEffect(() => {
    scene.background = texture;
    scene.backgroundIntensity = 1.05;
    scene.backgroundBlurriness = 0;
  }, [scene, texture]);

  return null;
};

export default Background;