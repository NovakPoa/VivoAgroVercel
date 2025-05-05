import React, { useRef, forwardRef, useEffect, useCallback} from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTFAnimations } from '../../../../../../hooks/useGLTFAnimations';
import * as THREE from 'three';
import useSoundStore from '../../../../../../stores/SoundStore';

const MODELS = [
  {
    path: '/models/products/GestaoPecuaria/VacaHolandesa.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1,
    attachName: 'RigREarTip',
    idleAnimName: 'VacaComendo02_Animacao',
  },  
  {
    path: '/models/products/GestaoPecuaria/VacaNelore.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1,
    attachName: 'RigLEarTip',
    idleAnimName: 'VacaEmPe01_Animacao',
  },
];

const findObjectMesh = (object, meshName) => {
  const targetObject = object.getObjectByName(meshName);
  if (targetObject) {
    return targetObject;
  }
  
  return null;  
};

const Vaca = forwardRef(({ path, position, rotation, scale, onMeshFound, index, attachName, idleAnimName, playSecondAnimation = false, skipProduct = false }, ref) => {
  const { scene, play, stop, jumpToEnd } = useGLTFAnimations(path, {
    cloneScene: false,
  });
  const meshRef = useRef(null);
  const frameCounter = useRef(0);

  useEffect(() => {
    if (scene) {
      // Desabilitando frustum culling
      const objectNames = ['VacaNelore_1', 'VacaNelore_2', 'VacaHolandesa'];
      objectNames.forEach(name => {
        const objectMesh = findObjectMesh(scene, name);
        if (objectMesh) {
          objectMesh.frustumCulled = false;
        }
      });

      const objectAttach = findObjectMesh(scene, attachName);
      if (objectAttach) {
        meshRef.current = objectAttach;
      }

      play(idleAnimName, {
        loop: true, 
      });
    }

  }, [scene]);

  useEffect(() => {
    if (!scene) return;

    if (skipProduct) {
      jumpToEnd('scaleInVFXVaca');  //conferir nome da animaçao - scale in VFX
      play('loopVFXVaca', {         //conferir nome da animaçao - loop VFX
        loop: true, 
        timeScale: 2.4,
      });   
    }
  }, [skipProduct, play, jumpToEnd]);
  
  useEffect(() => {
    if (playSecondAnimation) {
      play('scaleInVFXVaca', {      //conferir nome da animaçao
        loop: false, 
        timeScale: 2.4,
        onFinish: onAnimationEnded
      });
    }
  }, [play, playSecondAnimation]);

  const onAnimationEnded = useCallback(() => {
    play('loopVFXVaca', {           //conferir nome da animaçao
      loop: true, 
      timeScale: 2.4,
    }); 
  }, [play]); 

  useFrame(() => {
    if (meshRef.current) {
      frameCounter.current += 1;

      const worldPos = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPos);

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

const Vacas = ({ onObjectPositionUpdate, playSecondAnimation = false, skipProduct = false}) => {
  const vacaRefs = useRef([]);
  const { playSound, stopSound } = useSoundStore();
  const soundIdRef = useRef(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef(null);

  const SOUND_POSITION = [0, 1.6, -3];

  const soundConfig = {
    minTimeBetweenSounds: 5,
    maxTimeBetweenSounds: 15,
    minVolume: 0.6,
    maxVolume: 1.0,
    minPitch: 0.8,
    maxPitch: 1.2
  };

  // Função para reproduzir um som aleatório
  const playRandomSound = () => {
    if (isPlayingRef.current) return;

    const soundId = Math.random() > 0.5 ? 'VACA_A' : 'VACA_B';
    const volume = Math.random() *
      (soundConfig.maxVolume - soundConfig.minVolume) + soundConfig.minVolume;
    const rate = Math.random() *
      (soundConfig.maxPitch - soundConfig.minPitch) + soundConfig.minPitch;

    // Reproduzir o som em posição fixa
    const id = playSound(soundId, {
      volume,
      rate,
      spatial: true,
      position: SOUND_POSITION,
      onEnd: () => {
        isPlayingRef.current = false;
        soundIdRef.current = null;
        scheduleNextSound();
      }
    });

    isPlayingRef.current = true;
    soundIdRef.current = { id, soundId };
  };

  // Agendar o próximo som
  const scheduleNextSound = () => {
    const delay = (Math.random() *
      (soundConfig.maxTimeBetweenSounds - soundConfig.minTimeBetweenSounds) +
      soundConfig.minTimeBetweenSounds) * 1000;

    timerRef.current = setTimeout(() => {
      playRandomSound();
    }, delay);
  };

  useEffect(() => {
    // Iniciar os sons com um pequeno atraso inicial
    timerRef.current = setTimeout(() => {
      playRandomSound();
    }, 500);

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (soundIdRef.current) {
        stopSound(soundIdRef.current.soundId, soundIdRef.current.id);
        soundIdRef.current = null;
      }
    };
  }, []);

  return (
    <group name="vacas">
      {MODELS.map((model, index) => (
        <Vaca
          key={index}
          index={index}
          ref={el => vacaRefs.current[index] = el}
          path={model.path}
          position={model.position}
          rotation={model.rotation}
          scale={model.scale}
          attachName={model.attachName}
          idleAnimName={model.idleAnimName}
          onMeshFound={onObjectPositionUpdate}
          playSecondAnimation={playSecondAnimation}
          skipProduct={skipProduct}
        />
      ))}
    </group>
  );
};

export default Vacas;