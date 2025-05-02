import { useRef, useEffect } from 'react';
import { useGLTFAnimations } from './useGLTFAnimations';
import * as THREE from 'three';
import useAssetsStore from '../stores/AssetsStore';

export const useTablet = (modelPath, videoPath, animateTablet) => {
  const meshRef = useRef();
  const videoTextureRef = useRef(null);
  const videoRef = useRef(null);  
  const screenMeshRef = useRef(null);
  const originalMaterialRef = useRef(null);
  const hasAnimatedBeforeRef = useRef(false);

  const { scene, play } = useGLTFAnimations(modelPath, {
    cloneScene: false,
  });
  
  const { getVideo } = useAssetsStore();

  // Encontra e armazena referência ao mesh da tela
  useEffect(() => {
    if (scene) {

      const screenMesh = scene.getObjectByName('Screen');

      if (screenMesh) {
        screenMeshRef.current = screenMesh;
        // Guarda uma cópia do material original
        if (screenMesh.material) {
          originalMaterialRef.current = screenMesh.material.clone();
        }
      } else {
        console.warn(`Mesh "${screenMeshName}" não encontrado no modelo ${modelPath}`);
      }
      
      // Cria a textura de vídeo
      const video = getVideo(videoPath);
      if (video) {
        video.loop = false;
        videoRef.current = video;
        
        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        
        videoTextureRef.current = videoTexture;
      }
    }
  }, [scene, getVideo, videoPath]);

  // Controla a reprodução do vídeo
  useEffect(() => {
    if (!videoRef.current) return;
    
    if (animateTablet) {
      play('TabletAction', {
        loop: false, 
        timeScale: 2.4
      });
      play('ScreenAction', {// remover uma das duas animaçoes (corrigir no modelo glb com uma root unica)
        loop: false, 
        timeScale: 2.4
      });

      hasAnimatedBeforeRef.current = true;

      // Inicia o vídeo com delay
      setTimeout(() => {
        if (screenMeshRef.current?.material && videoTextureRef.current) {
          screenMeshRef.current.material.map = videoTextureRef.current;
          screenMeshRef.current.material.emissiveMap = videoTextureRef.current;
          screenMeshRef.current.material.emissive = new THREE.Color(1, 1, 1);
          screenMeshRef.current.material.emissiveIntensity = 0.8;
          screenMeshRef.current.material.needsUpdate = true;
        }

        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(err => {
          console.warn('Erro ao reproduzir vídeo automaticamente:', err);
        });        
      }, 1200);   
    } else if (hasAnimatedBeforeRef.current) {
      // Pausa o vídeo
      videoRef.current.pause();

      // Restaura material original
      if (originalMaterialRef.current && screenMeshRef.current) {
        screenMeshRef.current.material = originalMaterialRef.current.clone();
        screenMeshRef.current.material.needsUpdate = true;
      }    
      
      play('TabletAction', {
        loop: false,
        timeScale: -2.4, // Velocidade negativa = animação reversa
        clampWhenFinished: true
      });
      
      play('ScreenAction', {// remover uma das duas animaçoes (corrigir no modelo glb com uma root unica)
        loop: false,
        timeScale: -2.4, // Velocidade negativa = animação reversa
        clampWhenFinished: true
      });      
    }
  }, [animateTablet, play]);
  
  // Atualiza a textura do vídeo quando o quadro é renderizado
  useEffect(() => {
    let id;
    
    if (animateTablet && videoRef.current && videoTextureRef.current) {
      const updateVideoTexture = () => {
        if (!videoRef.current.paused) {
          videoTextureRef.current.needsUpdate = true;
        } else {
          clearInterval(id);
          id = null;
        }
      };
      
      id = setInterval(updateVideoTexture, 1000/30);
      
      videoRef.current.addEventListener('ended', () => {
        if (id) {
          clearInterval(id);
          id = null;
        }
      });
    }
    
    return () => {
      if (id) clearInterval(id);
      if (videoRef.current) {
        videoRef.current.onended = null;
      }
    };
  }, [animateTablet]);

  return {
    scene,
    meshRef
  };
};