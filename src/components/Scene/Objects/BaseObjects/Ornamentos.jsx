import React, { useRef, useEffect } from 'react';
import { useFBX } from '@react-three/drei';
import * as THREE from 'three';

const Ornamentos = () => {
  const fbx = useFBX('/models/fazenda/Ornamentos/Ornamentos-2.fbx');
  const meshRef = useRef();
  
  useEffect(() => {
    if (fbx) {
      console.log("Ornamentos FBX carregado:", fbx);
      
      const textureLoader = new THREE.TextureLoader();
      
      // Mapeamento de materiais para texturas
      const materialTextureMap = {
        'Marble': '/models/fazenda/Ornamentos/Textures/Balde_Bake.png',
        'Plants_Set_cone': '/models/fazenda/Ornamentos/Textures/Image_12.png',
        'Material.001': '/models/fazenda/Ornamentos/Textures/Balde_Bake.png',
        'Plants_Set_leaf_2': '/models/fazenda/Ornamentos/Textures/Image_12.png',
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

export default Ornamentos;