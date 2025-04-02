import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import useAssetsStore from '../../../../stores/AssetsStore';

const Casa = () => {
  const meshRef = useRef();
  const { getModel, getTexture } = useAssetsStore();
  const fbx = React.useMemo(
    () => getModel('/models/fazenda/Casa/Casa.fbx'),[] 
  );

  useEffect(() => {
    if (fbx) {
      // Mapeamento de materiais para texturas
      const materialTextureMap = {
        'Sede-madeira-bordas': '/models/fazenda/Casa/Textures/Sede-Madeira-Bordas-Bake.png',
        'Material': '/models/fazenda/Casa/Textures/madeira-clara_Bake.png',
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
/*       position={[0, 0, -5]}
      rotation={[0, 1.55, 0]} */
      scale={0.02}
    />
  );
};

export default Casa;