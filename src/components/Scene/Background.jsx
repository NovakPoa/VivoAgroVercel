import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useAssetsStore from '../../stores/AssetsStore';

const Background = () => {
  const { scene, camera } = useThree();
  const { getTexture, isLoading } = useAssetsStore();
  const skyboxRef = useRef();
  
  useEffect(() => {
    if (!isLoading) {
      const px = getTexture('/skybox/px.png');
      const nx = getTexture('/skybox/nx.png');
      const py = getTexture('/skybox/py.png');
      const ny = getTexture('/skybox/ny.png');
      const pz = getTexture('/skybox/pz.png');
      const nz = getTexture('/skybox/nz.png');
      
      if (px && nx && py && ny && pz && nz) {
        scene.background = null;
        
        const materials = [
          new THREE.MeshBasicMaterial({ map: px, side: THREE.BackSide }),
          new THREE.MeshBasicMaterial({ map: nx, side: THREE.BackSide }),
          new THREE.MeshBasicMaterial({ map: py, side: THREE.BackSide }),
          new THREE.MeshBasicMaterial({ map: ny, side: THREE.BackSide }),
          new THREE.MeshBasicMaterial({ map: pz, side: THREE.BackSide }),
          new THREE.MeshBasicMaterial({ map: nz, side: THREE.BackSide })
        ];
        
        const skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
        const skybox = new THREE.Mesh(skyboxGeo, materials);
        
        skybox.layers.set(0);
        
        scene.add(skybox);
        
        skyboxRef.current = skybox;
      }
    }
    
    return () => {
      if (skyboxRef.current) {
        scene.remove(skyboxRef.current);
        skyboxRef.current.geometry.dispose();
        skyboxRef.current.material.forEach(material => material.dispose());
      }
    };
  }, [isLoading, scene]);

  return null;
};

export default Background;