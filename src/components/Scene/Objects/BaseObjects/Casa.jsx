import React, { useRef, useEffect } from 'react';
import { useFBX } from '@react-three/drei';
import * as THREE from 'three';

const Casa = () => {
  const fbx = useFBX('/models/fazenda/Casa/Casa.fbx');
  const meshRef = useRef();
  
  useEffect(() => {
    if (fbx) {
      console.log("Casa FBX carregado:", fbx);
      
      const textureLoader = new THREE.TextureLoader();
      
      // Mapeamento de materiais para texturas
      const materialTextureMap = {
        'Sede-madeira-bordas': '/models/fazenda/Casa/Textures/Sede-Madeira-Bordas-Bake.png',
        'Material': '/models/fazenda/Casa/Textures/madeira-clara_Bake.png',
      };
      
      fbx.traverse((child) => {
        if (child.isMesh) {
          console.log("Mesh encontrado:", child.name);
          
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (Array.isArray(child.material)) {
            console.log(`Objeto com ${child.material.length} materiais`);
            
            child.material.forEach((mat, index) => {
              console.log(`Material ${index}:`, mat.name);
              
              const texturePath = materialTextureMap[mat.name] || 
                Object.values(materialTextureMap)[index % Object.values(materialTextureMap).length];
              
              if (texturePath) {
                const texture = textureLoader.load(texturePath);
                texture.encoding = THREE.sRGBEncoding;
                
                mat.map = texture;
                mat.needsUpdate = true;
              }
            });
          }
        }
      });
    }
  }, [fbx]);
  
  return (
    <primitive 
      object={fbx} 
      ref={meshRef}
      position={[0, 0, -5]}
      rotation={[0, 1.55, 0]}
      scale={0.02}
    />
  );
};

export default Casa;