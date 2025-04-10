import React, { useRef, forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

const MODEL_PATH = '/models/fazenda/Mesa.glb';

const MESAS_CONFIG = [
  {
    position: [1.1, 0, 0],
    rotation: [0, 0, 0],
    scale: 0.2
  },
  {
    position: [0, 0, 1.1],
    rotation: [0, Math.PI / 2, 0],
    scale: 0.2
  },
  {
    position: [0, 0, -1.1],
    rotation: [0, Math.PI / 2, 0],
    scale: 0.2
  }
];

const Mesa = forwardRef(({ position, rotation, scale }, ref) => {
  const { scene } = useGLTF(MODEL_PATH);
  
  if (!scene) return null;
  
  return (
    <primitive 
      object={scene.clone()} 
      ref={ref}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
});

const Mesas = () => {
  const mesasRefs = useRef([]);
  
  return (
    <group name="mesas">
      {MESAS_CONFIG.map((config, index) => (
        <Mesa 
          key={index}
          ref={el => mesasRefs.current[index] = el}
          position={config.position}
          rotation={config.rotation}
          scale={config.scale}
        />
      ))}
    </group>
  );
};

export default Mesas;