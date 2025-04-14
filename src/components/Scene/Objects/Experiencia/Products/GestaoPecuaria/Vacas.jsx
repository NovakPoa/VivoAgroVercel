import React, { useRef, forwardRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTFAnimations } from '../../../../../../hooks/useGLTFAnimations';
import useProductsStore from '../../../../../../stores/ProductsStore';
import useInteractionStore from '../../../../../../stores/InteractionStore';
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

const findObjectMesh = (object) => {
  let targetMesh = null;
  
  object.traverse((child) => {   
    if (child.isMesh && child.name === 'Olho') {
      targetMesh = child;
    }
  });
  
  return targetMesh;
};

const Vaca = forwardRef(({ path, position, rotation, scale, onMeshFound, index }, ref) => {
  const { scene, controlAnimation } = useGLTFAnimations(path, true, { loop: true });
  const meshRef = useRef(null);
  const frameCounter = useRef(0);
  const { currentProduct } = useProductsStore();
  const showFirstInteraction = useInteractionStore(state => state.showFirstInteraction);

  useEffect(() => {
    if (scene) {
      const objectMesh = findObjectMesh(scene);
      if (objectMesh) {
        meshRef.current = objectMesh;
      }
    }
  }, [scene]);
  
  useFrame(() => {
    if (meshRef.current && currentProduct === 'gestao-pecuaria' && showFirstInteraction) {
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