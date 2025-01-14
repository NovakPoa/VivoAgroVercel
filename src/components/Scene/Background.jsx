import React, { useEffect } from 'react';
import { useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import px from '/textures/px.jpg'; // right
import nx from '/textures/nx.jpg'; // left
import py from '/textures/py.jpg'; // top
import pz from '/textures/pz.jpg'; // front
import ny from '/textures/ny.jpg'; // bottom
import nz from '/textures/nz.jpg'; // back

const Background = () => {
  const { scene } = useThree();
  const texture = useLoader(THREE.CubeTextureLoader, [[px, nx, py, ny, pz, nz]]);

  useEffect(() => {
    scene.background = texture;
    scene.backgroundIntensity = 1.05;
    scene.backgroundBlurriness = 0;
  }, [scene, texture]);

  return null;
};

export default Background;