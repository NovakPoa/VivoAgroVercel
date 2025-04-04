import React from 'react';
import { useGLTF } from '@react-three/drei';

const MODELS = [
  {
    path: '/models/vegetaçao/Grama.glb',
    position: [4, 0, -10],
    rotation: [0, 0, 0],
    scale: 1
  },
  {
    path: '/models/vegetaçao/PlantaçaoDeSoja.glb',
    position: [15, 0, 5],
    rotation: [0, 0, 0],
    scale: 0.8
  },
  {
    path: '/models/vegetaçao/ArvoresDistantes.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  },
  {
    path: '/models/vegetaçao/VegetaçaoPerto.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  }  
];

const Vegetaçao = () => {
  return (
    <group name="vegetacao">
      {MODELS.map((model, index) => (
        <VegetacaoItem 
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

const VegetacaoItem = ({ path, position, rotation, scale }) => {
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

export default Vegetaçao;