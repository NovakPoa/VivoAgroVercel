import React, { useRef, useCallback, useEffect } from 'react';
import { useGLTFAnimations } from '../../../../../hooks/useGLTFAnimations';

const MODEL_PATH = '/models/intro/LogoVivoAgro.glb';

const IntroLogo = () => {
  const groupRef = useRef();
  
  const { scene, play, playAll, stopAll } = useGLTFAnimations(MODEL_PATH, {
    cloneScene: false,
  });

  const handleAnimationFinish = useCallback((event) => {
    //console.log(`Animação GLB finalizada: ${event.clipName}`);
  }, []);

  useEffect(() => {
    playAll({ 
      loop: false, 
      onFinish: handleAnimationFinish
    });
  }, []);

  // Se não tiver cena, não renderiza nada
  if (!scene) return null;

  return (
    <group 
      ref={groupRef}
      position={[4, 0.24, -8]} 
      rotation={[0, -0.0982, 0]}
      scale={1.4}
    >
      <primitive object={scene} />
    </group>
  );
};

export default IntroLogo;