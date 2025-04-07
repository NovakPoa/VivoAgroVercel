import React from 'react';
import { useGLTF } from '@react-three/drei';

const MODELS = [
  {
    path: '/models/fazenda/Solo.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  },
  {
    path: '/models/fazenda/Casa.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  },
  {
    path: '/models/fazenda/Cercas.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  },
  {
    path: '/models/fazenda/Galpao.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  },
  {
    path: '/models/fazenda/Ornamentos.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  }
];

const Fazenda = () => {
  return (
    <group name="fazenda">
      {MODELS.map((model, index) => (
        <FazendaItem 
          key={index}
          path={model.path}
          position={model.position}
          rotation={model.rotation}
          scale={model.scale}
        />
      ))}
    </group>
  );
};

const FazendaItem = ({ path, position, rotation, scale }) => {
  const { scene } = useGLTF(path);
  
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

export default Fazenda;