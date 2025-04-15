import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_PATH = '/models/intro/IntroNeon.glb';

const IntroNeon = ({ position = [1, 0, 1], rotation = [0, 0, 0], scale = [0.2, 0.2, 0.005] }) => {
  const groupRef = useRef();
  const { scene } = useGLTF(MODEL_PATH);

  useEffect(() => {
    if (!scene) return;
    
    // Função para procurar morph targets
    const findMorphTargetMesh = (object) => {
      if (object.morphTargetDictionary && Object.keys(object.morphTargetDictionary).length > 0) {
        return object;
      }
      
      if (object.children) {
        for (let child of object.children) {
          const found = findMorphTargetMesh(child);
          if (found) return found;
        }
      }
      
      return null;
    };
    
    // Configurar morph targets
    const morphMesh = findMorphTargetMesh(scene);
    
    if (morphMesh) {
      if (morphMesh.morphTargetInfluences) {
        morphMesh.morphTargetInfluences.fill(0);
        
        const frameIndex = morphMesh.morphTargetDictionary["frame_0200"];
        if (frameIndex !== undefined) {
          morphMesh.morphTargetInfluences[frameIndex] = 1.0;
        } 
      }
    }
    

    scene.traverse((object) => {
      if (object.isMesh) {

        object.layers.enable(1);
        
        object.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0.57, 0.88, 0.73),
          emissive: new THREE.Color(0.4, 0.0, 0.6),
          emissiveIntensity: 10.0,
          roughness: 0.5,
          metalness: 0.8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7, 

        });
      }
    });
  }, [scene]);

  if (!scene) return null;

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};

export default IntroNeon;