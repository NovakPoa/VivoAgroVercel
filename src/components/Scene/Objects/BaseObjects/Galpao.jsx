import React, { useRef, useEffect } from 'react';
import { useFBX } from '@react-three/drei';
import * as THREE from 'three';

const Galpao = () => {
  const fbx = useFBX('/models/fazenda/Galpao/Galpao.fbx');
  const meshRef = useRef();
  
  useEffect(() => {
    if (fbx) {
      console.log("Galpao FBX carregado:", fbx);
      
      const textureLoader = new THREE.TextureLoader();
      
      // Mapeamento de materiais para texturas
      const materialTextureMap = {
        'Galpao-estrutura': '/models/fazenda/Galpao/Textures/Galpao_Baked-1001.png',
        'Galpao-Telhado': '/models/fazenda/Galpao/Textures/Galpao-Telhado_Bake.png',
        'Galpao-interno': '/models/fazenda/Galpao/Textures/Galpao_Baked-1003.png'
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
          } else if (child.material) {
            const materialName = child.material.name;
            const texturePath = materialTextureMap[materialName] || 
              Object.values(materialTextureMap)[0];
            
            if (texturePath) {
              const texture = textureLoader.load(texturePath);
              texture.encoding = THREE.sRGBEncoding;
              
              child.material.map = texture;
              child.material.needsUpdate = true;
            }
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
      scale={0.01}
    />
  );
};

export default Galpao;