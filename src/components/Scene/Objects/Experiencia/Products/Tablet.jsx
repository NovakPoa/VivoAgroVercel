import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useGLTFAnimations } from '../../../../../hooks/useGLTFAnimations';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MODEL_PATH = '/models/geral/Tablet.glb';
const SCREEN_POSITION = [0, 0, -1.02];
const SCREEN_ROTATION = [0, 0, 0];
const SCREEN_SCALE = [9, 8, 5];

const Tablet = ({position, rotation = [0, 0, 0], scale = 1, animateTablet = false, children}) => {
  const groupRef = useRef();
  const screenRef = useRef();
  const htmlGroupRef = useRef();
  const { scene, playAll, stopAll } = useGLTFAnimations(MODEL_PATH, {
    cloneScene: true,
  });

  useEffect(() => {
    if (animateTablet) {
      playAll({ 
        loop: false, 
      });
    }
    // Limpar na desmontagem
    return () => stopAll();
  }, [animateTablet]);
    
  useEffect(() => {
    if (scene) {
      const screenNode = scene.getObjectByName("Screen") || scene.getObjectByName("Tela") || scene.children[0];
      if (screenNode) {
        screenRef.current = screenNode;
      }
    }
  }, [scene]);

  useFrame(() => {
    if (screenRef.current && htmlGroupRef.current) {
      screenRef.current.updateWorldMatrix(true, false);
      const screenWorldPosition = new THREE.Vector3();
      const screenWorldQuaternion = new THREE.Quaternion();
      const screenWorldScale = new THREE.Vector3();
      
      screenRef.current.matrixWorld.decompose(
        screenWorldPosition,
        screenWorldQuaternion,
        screenWorldScale
      );
      
  
      htmlGroupRef.current.position.copy(screenWorldPosition);
      htmlGroupRef.current.quaternion.copy(screenWorldQuaternion);

    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
      
      {children && (
        <group ref={htmlGroupRef}>
          <Html
            transform
            position={SCREEN_POSITION}
            rotation={SCREEN_ROTATION}
            scale={SCREEN_SCALE}
            occlude={false}
            distanceFactor={1}
            className="tablet-screen-content"
          >
            <div style={{ 
              width: '1024px', 
              height: '768px',
              backgroundColor: '#fff',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              {children}
            </div>
          </Html>
        </group>
      )}
    </group>
  );
};

export default Tablet;