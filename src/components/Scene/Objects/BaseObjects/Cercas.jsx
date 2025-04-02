import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import useAssetsStore from '../../../../stores/AssetsStore';

const Cercas = () => {
  const meshRef = useRef();
  const { getModel, getTexture } = useAssetsStore();
  const fbx = React.useMemo(
    () => getModel('/models/fazenda/Cercas/Cercas.fbx'),[] 
  );

  useEffect(() => {
    if (fbx) {             
      // Mapeamento de materiais para texturas
      const materialTextureMap = {
        'M_Planks.013': '/models/fazenda/Cercas/Textures/Cerca-arame_CercaMadeira_BaseColor.png',
        'M_Planks.001': '/models/fazenda/Cercas/Textures/acbd.png',
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
/*       position={[3, 0, 3]} 
      rotation={[0, 1.57, 0]} */
      scale={0.01}
    />
  );
};

export default Cercas;