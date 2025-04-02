import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useProcessedModel } from '../../../../hooks/useProcessedModel';

const Antena = ({position}) => {
  const meshRef = useRef();
  const [shouldScale, setShouldScale] = useState(true);

  const textureMapping = {
    'Antena': '/models/fazenda/Solo/Textures/Solo_Baked-1001.png',     /// alterar
    'Antena.001': '/models/fazenda/Solo/Textures/Solo_Baked-1002.png', /// alterar
  };
  const fbx = useProcessedModel('/models/products/AgroCobertura/Antena.fbx', textureMapping); 

  // Definir escala inicial
  useEffect(() => {
    if (meshRef.current) {
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
          /* console.log("Animação completa, escala final:", meshRef.current.scale.x); */
        }
      });
    }
  }, [shouldScale]);


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