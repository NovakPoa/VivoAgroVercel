import React, { useRef, forwardRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTFAnimations } from '../../../../../../hooks/useGLTFAnimations';
import * as THREE from 'three';

const MODELS = [
  {
    path: '/models/products/GestaoPecuaria/VacaNelore.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  },
  {
    path: '/models/products/GestaoPecuaria/VacaHolandesa.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  },
];

const findObjectMesh = (object, meshName = 'Olho') => {
  const targetObject = object.getObjectByName(meshName);

  if (targetObject && targetObject.isMesh) {
    return targetObject;
  }
  
  return null;
};

const Vaca = forwardRef(({ path, position, rotation, scale, onMeshFound, index }, ref) => {
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
    if (meshRef.current) {
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

const Vacas = ({ onObjectPositionUpdate }) => {
  const vacaRefs = useRef([]);
  
  return (
    <group name="vacas">
      {MODELS.map((model, index) => (
        <Vaca 
          key={index}
          index={index}
          ref={el => vacaRefs.current[index] = el}
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

export default Vacas;