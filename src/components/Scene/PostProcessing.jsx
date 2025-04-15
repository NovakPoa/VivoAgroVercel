import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { EffectComposer, SelectiveBloom } from '@react-three/postprocessing';

const PostProcessing = () => {
  const { scene: threeScene } = useThree();
/*   const [lights, setLights] = useState([]);
  const lightRef = useRef();
  
  // Criar uma luz dedicada para o bloom
  useEffect(() => {
    // Criar uma luz dedicada para o SelectiveBloom
    const bloomLight = new THREE.DirectionalLight(0xffffff, 0.1);
    bloomLight.position.set(0, 10, 0);
    // Torná-la visível mas com intensidade mínima para não afetar a iluminação
    bloomLight.visible = true;
    
    // Adicionar à cena
    threeScene.add(bloomLight);
    
    // Definir o ref para uso imediato
    lightRef.current = bloomLight;
    
    // Definir também no state para rerender
    setLights([bloomLight]);
    
    return () => {
      threeScene.remove(bloomLight);
      lightRef.current = null;
    };
  }, [threeScene]);

  // Não renderizar até termos luz
  if (!lightRef.current) return null; */

  return (
    <EffectComposer multisampling={8}>
{/*       <SelectiveBloom 
        lights={[lightRef.current]}
        selectionLayer={1}
        intensity={2.5}
        luminanceThreshold={0.0}
        luminanceSmoothing={0.0}
        height={256}
      /> */}
    </EffectComposer>
  );
};

export default PostProcessing;