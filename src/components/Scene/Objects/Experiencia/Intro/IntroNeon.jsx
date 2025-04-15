import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useIntroStore from '../../../../../stores/IntroStore';

const MODEL_PATH = '/models/intro/IntroNeon.glb';

const IntroNeon = ({ 
  position = [3, 0, 7], 
  rotation = [0, 0, 0], 
  scale = [0.2, 0.2, 0.005], 
  animationSpeed = 5.0,
  fadeDuration = 2.0,
  fadeStartOffset = 10 // Quantos frames antes do final para começar o fade
}) => {
  const groupRef = useRef();
  const { scene } = useGLTF(MODEL_PATH);
  // Adicionar setStartIntro aqui
  const { startIntro, setIntroNeonVisibility, setStartIntro } = useIntroStore();

  const [morphMeshRef, setMorphMeshRef] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [fading, setFading] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1.0);
  
  const [frameNames, setFrameNames] = useState([]);
  const frameTimeRef = useRef(0);
  const fadeTimeRef = useRef(0);

  // Configuração inicial quando a cena for carregada
  useEffect(() => {
    if (!scene) {
      console.log("IntroNeon: Cena não encontrada");
      return;
    }
    
    // Função para procurar morph targets
    const findMorphTargetMesh = (object) => {
      if (object.morphTargetDictionary && Object.keys(object.morphTargetDictionary).length > 0) {
        return object;
      }
      
      if (object.children) {
        for (let child of object.children) {
          const found = findMorphTargetMesh(child);
          if (found) return found;
        }
      }
      
      return null;
    };
    
    // Configurar morph targets
    const morphMesh = findMorphTargetMesh(scene);
    
    if (morphMesh) {
      setMorphMeshRef(morphMesh);
      
      if (morphMesh.morphTargetInfluences) {
        morphMesh.morphTargetInfluences.fill(0);
      }
      
      // Organizar nomes dos frames em ordem numérica
      const frameNamesList = Object.keys(morphMesh.morphTargetDictionary)
        .filter(name => name.startsWith('frame_'))
        .sort((a, b) => {
          const numA = parseInt(a.split('_')[1]);
          const numB = parseInt(b.split('_')[1]);
          return numA - numB;
        });
      
      setFrameNames(frameNamesList);
      
      if (frameNamesList.length > 0) {
        const firstFrameIndex = morphMesh.morphTargetDictionary[frameNamesList[0]];
        if (firstFrameIndex !== undefined) {
          morphMesh.morphTargetInfluences[firstFrameIndex] = 1.0;
        }
      }
    } else {
      console.warn("IntroNeon: Nenhum mesh com morph targets encontrado!");
    }

    // Configurar materiais com transparência
    scene.traverse((object) => {
      if (object.isMesh) {
        object.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0.57, 0.88, 0.73),
          emissive: new THREE.Color(0.4, 0.0, 0.6),
          emissiveIntensity: 10.0,
          roughness: 0.5,
          metalness: 0.8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 1.0,
        });
      }
    });
  }, [scene]);
  
  // Iniciar animação quando startIntro mudar
  useEffect(() => {              
    if (startIntro && morphMeshRef && !animating) {
      setAnimating(true);
      setFading(false);
      setOpacity(1.0); // Reset opacity
      setCurrentFrame(0);
      setIsVisible(true);
      
      scene.traverse((object) => {
        if (object.isMesh) {
          object.layers.enable(1);
          if (object.material.transparent) {
            object.material.opacity = 1.0;
          }
        }
      });
      
      if (morphMeshRef.morphTargetInfluences) {
        morphMeshRef.morphTargetInfluences.fill(0);
      }
      
      if (frameNames.length > 0) {
        const firstFrameIndex = morphMeshRef.morphTargetDictionary[frameNames[0]];
        if (firstFrameIndex !== undefined) {
          morphMeshRef.morphTargetInfluences[firstFrameIndex] = 1.0;
        }
      }
    }
  }, [startIntro, morphMeshRef, animating, frameNames, scene]);
  

  
  useFrame((_, delta) => {
    if (animating && morphMeshRef && frameNames.length > 0) {
      frameTimeRef.current += delta;
      const baseFrameInterval = 0.05;
      const frameInterval = baseFrameInterval / animationSpeed;
      
      if (frameTimeRef.current >= frameInterval) {
        frameTimeRef.current = 0;
        
        const nextFrameIndex = currentFrame + 1;
        
        if (nextFrameIndex >= frameNames.length) {

          const lastFrameIndex = frameNames.length - 1;
          const lastMorphIndex = morphMeshRef.morphTargetDictionary[frameNames[lastFrameIndex]];
          
          if (lastMorphIndex !== undefined) {
            morphMeshRef.morphTargetInfluences[lastMorphIndex] = 1.0;

          }
          
          // Começar o fade
          setAnimating(false);
          setFading(true);
          fadeTimeRef.current = 0;
          setStartIntro(false);         
          return; 
        }
        
        const currentMorphIndex = morphMeshRef.morphTargetDictionary[frameNames[currentFrame]];
        const nextMorphIndex = morphMeshRef.morphTargetDictionary[frameNames[nextFrameIndex]];

        if (currentMorphIndex !== undefined) {
          morphMeshRef.morphTargetInfluences[currentMorphIndex] = 0.0;
        }

        if (nextMorphIndex !== undefined) {
          morphMeshRef.morphTargetInfluences[nextMorphIndex] = 1.0;
        }
        
        setCurrentFrame(nextFrameIndex);
        
        if (animating && !fading && fadeStartOffset > 0 && 
            nextFrameIndex >= frameNames.length - fadeStartOffset) {
          setFading(true);
          fadeTimeRef.current = 0;
        }
      }
    }
    
    // Processar fade out
    if (fading) {
      fadeTimeRef.current += delta;
      const progress = Math.min(fadeTimeRef.current / fadeDuration, 1.0);
      const newOpacity = 1.0 - progress;
      
      setOpacity(newOpacity);
      
      // Aplicar a opacidade a todos os materiais
      scene.traverse((object) => {
        if (object.isMesh && object.material.transparent) {
          object.material.opacity = newOpacity;
        }
      });
      
      // Esconder o componente quando ficar totalmente transparente
      if (newOpacity <= 0.01) {
        setIsVisible(false);
        setIntroNeonVisibility(false);
      }
    }
  });

  if (!scene || !isVisible) return null;

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale} visible={true}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload(MODEL_PATH);

export default IntroNeon;