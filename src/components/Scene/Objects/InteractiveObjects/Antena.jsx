import React, { useRef, useEffect } from 'react';
import { useFBX } from '@react-three/drei';
import * as THREE from 'three';

const Antena = ({position}) => {
  const fbx = useFBX('/models/products/AgroCobertura/Antena.fbx');
  const meshRef = useRef();
 
  useEffect(() => {
    if (fbx) {
      console.log("Modelo de Antena carregado:", fbx);
      
      const textureLoader = new THREE.TextureLoader();
      
      // Mapeamento de materiais para texturas
      const materialTextureMap = {
        'Antena': '/models/fazenda/Solo/Textures/Solo_Baked-1001.png',     /// alterar
        'Antena.001': '/models/fazenda/Solo/Textures/Solo_Baked-1002.png', /// alterar
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
              
              const texturePath = materialTextureMap[mat.name];
              
              if (texturePath) {
                const texture = textureLoader.load(texturePath);
                texture.encoding = THREE.sRGBEncoding;
                
                // Aplicar textura ao material
                mat.map = texture;
                
                // Configurações adicionais do material
                //mat.roughness = 0.8;
                //mat.metalness = 0.2;
                //mat.needsUpdate = true;
              }
            });
          }
        }
      });
      
      //fbx.scale.set(0.01, 0.01, 0.01);
    }
  }, [fbx]);
   
  return (
    <primitive 
      object={fbx} 
      ref={meshRef}
      position={position}
      scale={0.05}
    />
  );
};

export default Antena;