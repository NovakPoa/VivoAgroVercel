import React, { useRef, forwardRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTFAnimations } from '../../../../../../hooks/useGLTFAnimations';
import * as THREE from 'three';

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

const findObjectMesh = (object) => {
  let targetMesh = null;
  
  object.traverse((child) => {
    if (child.isMesh && child.name === 'Roçadeira_-_ok_Procedural') {
      targetMesh = child;
    }
  });
  
  return targetMesh;
};

const Trator = forwardRef(({ path, position, rotation, scale, onMeshFound, index }, ref) => {
  const { scene, playAll, stopAll } = useGLTFAnimations(path, {
    cloneScene: false,
  });
  const meshRef = useRef(null);
  const frameCounter = useRef(0);

  useEffect(() => {
    if (scene) {
      const objectMesh = findObjectMesh(scene);
      if (objectMesh) {
        meshRef.current = objectMesh;
      }

      playAll({ 
        loop: true, 
      });      
    }
  }, [scene]);
  
  useFrame(() => {
    if (meshRef.current ) {
      frameCounter.current += 1;
      
      const worldPos = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPos);
      
      if (onMeshFound) {
        onMeshFound(worldPos, index);
      }
    }
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

const Tratores = ({ onObjectPositionUpdate }) => {
  const tratorRefs = useRef([]);
  
  return (
    <group name="tratores">
      {MODELS.map((model, index) => (
        <Trator 
          key={index}
          index={index}
          ref={el => tratorRefs.current[index] = el}
          path={model.path}
          position={model.position}
          rotation={model.rotation}
          scale={model.scale}
          onMeshFound={onObjectPositionUpdate}
        />
      ))}
    </group>
  );
};

export default Tratores;