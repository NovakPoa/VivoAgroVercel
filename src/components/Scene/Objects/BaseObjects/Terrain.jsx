import React, { useRef, useEffect } from 'react';
import { useFBX } from '@react-three/drei';
import * as THREE from 'three';

const Terrain = () => {
  // O hook useFBX ainda vai "suspender" o componente, mas não usaremos Suspense para lidar com isso
  // Isso significa que o componente não renderizará nada até que o modelo esteja carregado
  const fbx = useFBX('/models/fazenda/Solo/Solo.fbx');
  const meshRef = useRef();
  
  useEffect(() => {
    if (fbx) {
      console.log("FBX carregado:", fbx);
      
      const textureLoader = new THREE.TextureLoader();
      
      // Mapeamento de materiais para texturas
      const materialTextureMap = {
        'Solo-1': '/models/fazenda/Solo/Textures/Solo_Baked-1001.png',
        'Solo-2': '/models/fazenda/Solo/Textures/Solo_Baked-1002.png',
        'Solo-3': '/models/fazenda/Solo/Textures/Solo_Baked-1003.png'
      };
      
      // Verificar materiais e aplicar texturas
      fbx.traverse((child) => {
        if (child.isMesh) {
          console.log("Mesh encontrado:", child.name);
          
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Manipular arrays de materiais (objetos com múltiplos materiais)
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
    }
  }, [fbx]);
  
  return (
    <primitive 
      object={fbx} 
      ref={meshRef}
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
      scale={0.005}
    />
  );
};

export default Terrain;