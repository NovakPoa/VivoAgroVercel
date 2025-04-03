import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const MODEL_PATH = '/models/fazenda/Solo.glb';

const Solo = () => {
  const meshRef = useRef();
  const { scene } = useGLTF(MODEL_PATH);
  
  useEffect(() => {
    if (scene) {
      console.log('Estrutura do modelo:', scene);
      
      // Percorrer todas as meshes e imprimir suas posições
      scene.traverse((object) => {
        if (object.isMesh) {
          console.log(`Mesh: ${object.name}`);
          console.log(` - Posição: ${object.position.x}, ${object.position.y}, ${object.position.z}`);
          console.log(` - Rotação: ${object.rotation.x}, ${object.rotation.y}, ${object.rotation.z}`);
          console.log(` - Escala: ${object.scale.x}, ${object.scale.y}, ${object.scale.z}`);
        }
      });
    }
  }, [scene]);

  if (!scene) return null;

  return (
    <primitive 
      object={scene} 
      ref={meshRef}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={1}
    />
  );
};

export default Solo;