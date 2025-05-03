import React, { useRef, forwardRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTFAnimations } from '../../../../../../hooks/useGLTFAnimations';
import * as THREE from 'three';
import useSoundStore from '../../../../../../stores/SoundStore';
import useAssetsStore from '../../../../../../stores/AssetsStore';

const MODELS = [
  {
    path: '/models/products/GestaoMaquinario/Trator.glb',
    position: [-10, 0, 5],
    rotation: [0, 0, 0],
    scale: 1,
    volume: 0.8,
    soundId: 'TRATOR_A'
  },
  {
    path: '/models/products/GestaoMaquinario/Trator.glb',
    position: [8, 0, 0],
    rotation: [0, 0, 0],
    scale: 1,
    volume: 0.4,
    soundId: 'TRATOR_B'
  },
  {
    path: '/models/products/GestaoMaquinario/Trator.glb',
    position: [-9, 0, 0],
    rotation: [0, 0, 0],
    scale: 1,
    volume: 0.4,
    soundId: 'TRATOR_C'
  },
];

const findObjectMesh = (object, meshName = 'Roçadeira_-_ok_Procedural') => {
  const targetObject = object.getObjectByName(meshName);

  if (targetObject && targetObject.isMesh) {
    return targetObject;
  }
  
  return null;  
};

const Trator = forwardRef(({ path, position, rotation, scale, volume = 0.5, onMeshFound, index, soundId }, ref) => {
  const { scene, playAll, stopAll } = useGLTFAnimations(path, {
    cloneScene: false,
  });
  const meshRef = useRef(null);
  const frameCounter = useRef(0);
  const soundIdRef = useRef(null);
  const soundRef = useRef(null);

  const { playSound, stopSound } = useSoundStore();

  useEffect(() => {
    if (scene) {
      const objectMesh = findObjectMesh(scene);
      if (objectMesh) {
        meshRef.current = objectMesh;
      }

      playAll({ 
        loop: true, 
      });
      
      // Iniciar som do trator
      if (meshRef.current) {
        const worldPos = new THREE.Vector3();
        meshRef.current.getWorldPosition(worldPos);
        
        soundIdRef.current = playSound(soundId, {
          volume: volume,
          spatial: true,
          loop: true,
          position: [worldPos.x, worldPos.y, worldPos.z],      
        });

        soundRef.current = useAssetsStore.getState().getSound(soundId);
        
        if (soundRef.current) {
          soundRef.current.pannerAttr({
            panningModel: 'HRTF',
            refDistance: 20,    
            rolloffFactor: 0.5, 
            distanceModel: 'linear',
            maxDistance: 80
          }, soundIdRef.current);
        }
      }
    }
    
    // Cleanup ao desmontar
    return () => {
      if (soundIdRef.current) {
        stopSound(soundId, soundIdRef.current);
        soundIdRef.current = null;
      }
    };
  }, [scene, playSound, stopSound, volume, soundId, index]);
  
  useFrame(() => {
    if (meshRef.current && soundRef.current && soundIdRef.current) {
      frameCounter.current += 1;
      
      const worldPos = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPos);
      
      if (soundIdRef.current) {
        soundRef.current.pos(worldPos.x, worldPos.y, worldPos.z, soundIdRef.current);
      }

      if (onMeshFound) {
        onMeshFound(worldPos, index);
      }
    }
  });

  if (!scene) return null;
  
  return (
    <primitive 
      ref={ref}
      object={scene} 
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
});

const Tratores = ({ onObjectPositionUpdate }) => {
  const tratorRefs = useRef([]);
  
  return (
    <group name="tratores">
      {MODELS.map((model, index) => (
        <Trator 
          key={index}
          index={index}
          ref={el => tratorRefs.current[index] = el}
          path={model.path}
          position={model.position}
          rotation={model.rotation}
          scale={model.scale}
          volume={model.volume}
          soundId={model.soundId}
          onMeshFound={onObjectPositionUpdate}
        />
      ))}
    </group>
  );
};

export default Tratores;