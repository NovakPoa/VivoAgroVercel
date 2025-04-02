import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import useAssetsStore from '../stores/AssetsStore';

export function useGLTFAnimations(modelPath, triggerAnimation = false, options = {}) {
  const {
    loop = false,
    clampWhenFinished = true,
    repetitions = Infinity,
    onFinish = null
  } = options;

  const { scene: originalScene, animations } = useGLTF(modelPath);
  const [clonedScene] = useState(() => originalScene ? originalScene.clone() : null);
  const mixerRef = useRef(null);
  const [animationActions, setAnimationActions] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!clonedScene || !animations || animations.length === 0) return;
    
    const mixer = new THREE.AnimationMixer(clonedScene);
    mixerRef.current = mixer;
    
    const actions = animations.map(clip => {
      const action = mixer.clipAction(clip);
      
      if (!loop) {
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = clampWhenFinished;
      } else {
        action.setLoop(THREE.LoopRepeat, repetitions);
      }
      
      return { name: clip.name, action, clip };
    });
    
    if (!loop && onFinish) {
      mixer.addEventListener('finished', (e) => {
        onFinish({
          ...e,
          clipName: e.action._clip.name
        });
      });
    }
    
    setAnimationActions(actions);
    
    return () => {
      if (mixer) {
        mixer.stopAllAction();
      }
    };
  }, [clonedScene, animations, loop, clampWhenFinished, repetitions, onFinish, modelPath]);

  useEffect(() => {
    if (triggerAnimation && animationActions.length > 0 && !isPlaying) {      
      animationActions.forEach(({ action }) => {
        action.reset();
        action.play();
      });
      
      setIsPlaying(true);
    }
  }, [triggerAnimation, animationActions, isPlaying, modelPath]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return {
    scene: clonedScene,
    animations: animationActions,
    isPlaying,
    controlAnimation: {
      play: () => {
        animationActions.forEach(({ action }) => action.play());
        setIsPlaying(true);
      },
      stop: () => {
        animationActions.forEach(({ action }) => action.stop());
        setIsPlaying(false);
      },
      reset: () => {
        animationActions.forEach(({ action }) => {
          action.stop();
          action.reset();
        });
        setIsPlaying(false);
      }
    }
  };
}