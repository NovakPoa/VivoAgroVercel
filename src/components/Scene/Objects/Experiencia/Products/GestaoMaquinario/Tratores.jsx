import React, { useRef, forwardRef } from 'react';
import { useGLTFAnimations } from '../../../../../../hooks/useGLTFAnimations';

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

const Trator = forwardRef(({ path, position, rotation, scale }, ref) => {
  const { scene, isPlaying, controlAnimation } = useGLTFAnimations(path, false, {
    loop: true,
  });
  
  if (!scene) return null;
  
  return (
    <primitive 
      ref={ref}
      object={scene} 
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
});


const Tratores = () => {
  const tratorRefs = useRef([]);
  
  if (!tratorRefs.current || tratorRefs.current.length !== MODELS.length) {
    tratorRefs.current = MODELS.map(() => null);
  }
  
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
        />
      ))}
    </group>
  );
};

export default Tratores;