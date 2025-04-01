import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import useAssetsStore from '../../../../stores/AssetsStore';

const Solo = () => {
  const meshRef = useRef();
  const { getModel, getTexture } = useAssetsStore();

  const fbx = React.useMemo(
    () => getModel('/models/fazenda/Solo/Solo.fbx'),[] 
  );

  useEffect(() => {
    if (fbx) {  
      // Mapeamento de materiais para texturas
      const materialTextureMap = {
        'Solo-1': '/models/fazenda/Solo/Textures/Solo_Baked-1001.png',
        'Solo-2': '/models/fazenda/Solo/Textures/Solo_Baked-1002.png',
        'Solo-3': '/models/fazenda/Solo/Textures/Solo_Baked-1003.png'
      };
      
      fbx.traverse((child) => {
        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

          if (Array.isArray(child.material)) {

            child.material.forEach((mat, index) => {
              
              const texturePath = materialTextureMap[mat.name];
              
              if (texturePath) {
                const texture = getTexture(texturePath);
                if (texture) {
                  texture.encoding = THREE.sRGBEncoding;
                  mat.map = texture;
                  mat.needsUpdate = true;
                }                

                // Configurações adicionais do material
                //mat.roughness = 0.8;
                //mat.metalness = 0.2;
              }
            });
          }
        }
      });
    }
  }, []);
  
  if (!fbx) return null;

  return (
    <primitive 
      object={fbx} 
      ref={meshRef}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={0.05}
    />
  );
};

export default Solo;