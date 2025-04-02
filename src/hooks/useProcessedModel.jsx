import React, { useEffect } from 'react';
import * as THREE from 'three';
import useAssetsStore from '../stores/AssetsStore';

export function useProcessedModel(modelPath, textureMapping) {
  const { getModel, getTexture } = useAssetsStore();
  const fbx = React.useMemo(() => getModel(modelPath), []);
  
  useEffect(() => {
    if (fbx) {
      fbx.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              const texturePath = textureMapping[mat.name];
              if (texturePath) {
                const texture = getTexture(texturePath);
                if (texture) {
                  texture.encoding = THREE.sRGBEncoding;
                  mat.map = texture;
                  mat.needsUpdate = true;
                }
              }
            });
          }
        }
      });
    }
  }, [fbx, textureMapping]);
  
  return fbx;
}