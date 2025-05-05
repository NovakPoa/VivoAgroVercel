import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { createTubeRevealMaterial } from '../shaders/TubeRevealShader';
import useSoundStore from '../stores/SoundStore';
import * as THREE from 'three';

const useNeonEffect = ({
  modelPath,
  instanceCount = 1,
  instanceOffset = [0, 0, 0],  
  // Shader props
  baseColor = '#660099',
  glowColor = '#9933FF',
  useXCoord = true,
  invertDirection = false,
  bloomStrength = 2.0,
  // Animation props
  animationDuration = 6,
  fadeOutDuration = 1,
  // Audio Props
  enableSound = true,
  appearSoundId = 'NEON_APPEAR',
  soundVolume = 0.7,  
  // Callback
  onFadeOutComplete = null
}) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();
  const appearSoundIdRef = useRef(null);
  const shaderMaterials = useRef([]);
  const progressRef = useRef(1.0);
  const opacityRef = useRef(1.0);  
  const animationStage = useRef('intro');

  const { playSound, stopSound } = useSoundStore();

  useEffect(() => {
    if (!scene || !modelRef.current) return;
    
    // Limpar instâncias anteriores
    while (modelRef.current.children.length > 0) {
      modelRef.current.remove(modelRef.current.children[0]);
    }
  
    shaderMaterials.current = [];
 
    for (let i = 0; i < instanceCount; i++) {
      // Clonar a cena para todas as instâncias 
      const clonedScene = i === 0 ? scene.clone() : scene.clone();
      
      // Aplicar shader material
      //if (i === 0) { } // Alterar material pra cada instância
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          const shaderMaterial = createTubeRevealMaterial({
            baseColor,
            glowColor,
            progress: 1.2,
            glowWidth: 0.05,
            fadeWidth: 0.1,
            useXCoord,
            invertDirection,
            bloomStrength,
            opacity: 1.0
          });
          shaderMaterials.current.push(shaderMaterial);
          child.material = shaderMaterial;
        }
      });
  
      // Posicionar todas as instâncias com offset
      clonedScene.position.set(
        instanceOffset[0] * i,  
        instanceOffset[1] * i,
        instanceOffset[2] * i
      );
      
      modelRef.current.add(clonedScene);

    }
    return () => {
      shaderMaterials.current.forEach(material => {
        if (material.dispose) material.dispose();
      });
    };
  }, [
    scene, 
    baseColor, 
    glowColor, 
    useXCoord, 
    invertDirection, 
    bloomStrength, 
    instanceCount, 
    instanceOffset
  ]);

  // Função para iniciar a animação
  const startAnimation = () => {
    animationStage.current = 'intro';

    if (enableSound && appearSoundId) {
      appearSoundIdRef.current = playSound(appearSoundId, {
        volume: soundVolume
      });
    }
        
    gsap.fromTo(progressRef, 
      { current: 1.0 },
      { 
        current: 0.0,
        duration: animationDuration,
        ease: "sine.inOut",
        immediateRender: true,
        onComplete: () => {
          startFadeOut();
        }
      }
    );
  };
  
  // Função para iniciar o fade out
  const startFadeOut = () => {
    animationStage.current = 'fadeOut';
    gsap.to(opacityRef, {
      current: 0,
      duration: fadeOutDuration,
      ease: "power1.Out",
      onComplete: () => {
        if (onFadeOutComplete) {
          onFadeOutComplete();
        }
      }
    });
  };
  
  // Atualizar os materiais a cada frame
  useFrame(() => {
    if (shaderMaterials.current.length > 0) {
      shaderMaterials.current.forEach(material => {
        material.uniforms.progress.value = progressRef.current;
        material.uniforms.opacity.value = opacityRef.current;
      });
    }
  });

  return {
    modelRef,
    startAnimation,
    startFadeOut
  };
};

export default useNeonEffect;