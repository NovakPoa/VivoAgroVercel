import React, { useRef, useCallback } from 'react';
import useIntroStore from '../../../../stores/IntroStore';
import { useProcessedModel } from '../../../../hooks/useProcessedModel';
import { useFBXAnimations } from '../../../../hooks/useFBXAnimations';

const IntroLogo = () => {
  const groupRef = useRef();
  const meshRef = useRef();
  const { introObjectAnimate, setIntroObjectAnimate } = useIntroStore();

  const textureMapping = {
    'Galpao-estrutura': '/models/fazenda/Galpao/Textures/Galpao_Baked-1001.png', // alterar
    'Galpao-Telhado': '/models/fazenda/Galpao/Textures/Galpao-Telhado_Bake.png', // alterar
  };
  
  const fbx = useProcessedModel('/models/intro/LogoVivoAgro.fbx', textureMapping);

  const handleAnimationFinish = useCallback((event) => {
    //console.log(`Animação finalizada: ${event.clipName}`);
  }, []);
  
  const animationOptions = {
    loop: false,
    clampWhenFinished: true,
    onFinish: handleAnimationFinish
  };

  const { animations, controlAnimation } = useFBXAnimations(fbx, introObjectAnimate, animationOptions);

  if (!fbx) return null;  
  
  return (
    <group
      ref={groupRef}
      scale={0.005}
      position={[4.088, 0.2, -8.377]}
      rotation={[0, 2.0982, 0]} 
      >
        <primitive 
          object={fbx} 
          ref={meshRef}
        />
    </group> 
  );
};

export default IntroLogo;