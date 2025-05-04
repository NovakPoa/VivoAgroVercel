import React from 'react';
import { useGLTF } from '@react-three/drei';

const MODELS = [
  {
    path: '/models/vegetacao/ArvoresDistantes.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  },
  {
    path: '/models/vegetacao/Grama.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  },
  {
    path: '/models/vegetacao/Soja.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  },
  {
    path: '/models/vegetacao/SojaFundo.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  },
  {
    path: '/models/vegetacao/VegetacaoPerto.glb',
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