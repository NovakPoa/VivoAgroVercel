import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTFAnimations } from '../../../../../../hooks/useGLTFAnimations';
import * as THREE from 'three';

// Definir posições iniciais para cada trator
const MODELS = [
  {
    path: '/models/products/GestaoMaquinario/TratorA3.glb',
    position: [-10, 0, 5],
    rotation: [0, 0, 0],
    scale: 1
  },
  {
    path: '/models/products/GestaoMaquinario/TratorB3.glb',
    position: [8, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  },
  {
    path: '/models/products/GestaoMaquinario/TratorC3.glb',
    position: [-9, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  },
];

const Tratores = () => {
  return (
    <group name="tratores">
      {MODELS.map((model, index) => (
        <Trator 
          key={index}
          ref={el => tratorRefs.current[index] = el}
          path={model.path}
          position={model.position}
          rotation={model.rotation}
          scale={model.scale}
          index={index}
        />
      ))}
    </group>
  );
};

const Trator = ({ path, position, rotation, scale }) => {
  
  const { scene, isPlaying, controlAnimation } = useGLTFAnimations(path, false, {
    loop: true,
  });
  
  if (!scene) return null;
  
  return (
    <primitive 
      object={scene} 
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

export default Tratores;