import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import useAssetsStore from '../../../../stores/AssetsStore';

const Antena = ({position}) => {
  const meshRef = useRef();
  const [shouldScale, setShouldScale] = useState(true);
/*   const [reset, setReset] = useState(false); */
  const { getModel, getTexture } = useAssetsStore();

  const fbx = React.useMemo(
    () => getModel('/models/products/AgroCobertura/Antena.fbx'),[] 
  );

  useEffect(() => {
    if (fbx) {
      console.log("Modelo de Antena carregado:", fbx);

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
           /*  console.log(`Objeto com ${child.material.length} materiais`); */
            
            child.material.forEach((mat, index) => {
              /* console.log(`Material ${index}:`, mat.name); */
              
              const texturePath = materialTextureMap[mat.name];
              
              if (texturePath) {
                const texture = getTexture(texturePath);
                if (texture) {
                  texture.encoding = THREE.sRGBEncoding;
                  mat.map = texture;
                }                

                // Configurações adicionais do material
                //mat.roughness = 0.8;
                //mat.metalness = 0.2;
                //mat.needsUpdate = true;
              }
            });
          }
        }
      });

      // Escala incial
      meshRef.current.scale.set(0.0001, 0.0001, 0.0001);
    }
  }, []);

  // Animação de scale-in
  useEffect(() => {
    if (fbx && meshRef.current && shouldScale) {
      gsap.to(meshRef.current.scale, {
        x: 0.04,
        y: 0.04,
        z: 0.04,
        duration: 1.8, 
        ease: "back.out(2.5)",     
        onComplete: () => {
          setShouldScale(false);
          console.log("Animação completa, escala final:", meshRef.current.scale.x);
        }
      });
    }
  }, [shouldScale]);

  // Reset
/*   useEffect(() => {
    if (reset) {
      setReset(false);
      meshRef.current.scale.set(0.0001, 0.0001, 0.0001);
    }
  }, [reset]);
 */
  if (!fbx) return null;

  return (
    <primitive 
      object={fbx} 
      ref={meshRef}
      position={position}
    />
  );
};

export default Antena;