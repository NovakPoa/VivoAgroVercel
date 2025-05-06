import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import useSoundStore from '../../../../stores/SoundStore';

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
  const ambientSoundRef = useRef(null);
  const { playSound, stopSound } = useSoundStore();

  useEffect(() => {
    // Tocar som ambiente em loop
    ambientSoundRef.current = playSound('AMBIENT', {
      volume: 0.4,   
      loop: true,  
      spatial: false  
    });
    
    // Limpar som ao desmontar o componente
    return () => {
      if (ambientSoundRef.current) {
        stopSound('AMBIENT', ambientSoundRef.current);
        ambientSoundRef.current = null;
      }
    };
  }, [playSound, stopSound]);

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