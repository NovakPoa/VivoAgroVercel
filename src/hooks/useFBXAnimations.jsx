import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function useFBXAnimations(fbx, triggerAnimation = false, options = {}) {
  const {
    loop = true,            
    clampWhenFinished = false,
    repetitions = Infinity,   
    onFinish = null          
  } = options;
  
  const mixerRef = useRef(null);
  const [animations, setAnimations] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (fbx && fbx.animations && fbx.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(fbx);
      mixerRef.current = mixer;
      
      const animationActions = fbx.animations.map(clip => {
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
          const finishedAction = e.action;
          onFinish({
            ...e,
            clipName: finishedAction._clip.name
          });
        });
      }
      
      setAnimations(animationActions);
    }
  }, [fbx, loop, clampWhenFinished, repetitions, onFinish]);

  useEffect(() => {
    if (triggerAnimation && animations.length > 0 && !isPlaying) {
      animations.forEach(({ action }) => {
        action.reset();
        action.play();
      });
      setIsPlaying(true);
    }
  }, [triggerAnimation, animations, isPlaying]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  const controlAnimation = {
    play: () => {
      animations.forEach(({ action }) => action.play());
      setIsPlaying(true);
    },
    stop: () => {
      animations.forEach(({ action }) => action.stop());
      setIsPlaying(false);
    },
    reset: () => {
      animations.forEach(({ action }) => {
        action.stop();
        action.reset();
      });
      setIsPlaying(false);
    }
  };

  return { animations, isPlaying, controlAnimation };
}