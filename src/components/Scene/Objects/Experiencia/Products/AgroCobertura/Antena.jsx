import React, { useRef, useEffect, useCallback } from 'react';
import { useGLTFAnimations } from '../../../../../../hooks/useGLTFAnimations';

const MODEL_PATH = '/models/products/AgroCobertura/Antena.glb';

const findObjectMesh = (object, meshName) => {
  const targetObject = object.getObjectByName(meshName);

  if (targetObject && targetObject.isMesh) {
    return targetObject;
  }

  return null;
};

const Antena = ({ position, rotation = [0, 0, 0], scale = 1, playSecondAnimation = false, skipProduct = false }) => {
  const meshRef = useRef();
  const { scene, play, jumpToEnd } = useGLTFAnimations(MODEL_PATH, {
    cloneScene: false,
  });

  useEffect(() => {
    if (!scene) return;

    // Desabilitando frustum culling
    const objectNames = ['AntenaBase', 'AntenaTorre', '4G700MHz_1', '4G700MHz_2', 'AntenaTorus'];
    objectNames.forEach(name => {
      const objectMesh = findObjectMesh(scene, name);
      if (objectMesh) {
        objectMesh.frustumCulled = false;
      }
    });

    if (!skipProduct) {
      play('Antena-Crescendo', {
        loop: false,
        timeScale: 0.35
      });
    } else {
      jumpToEnd('Antena-Crescendo');
      play('AntenaVFX-Crescendo');//conferir nome da animaçao
      play('AntenaVFX-Loop', { //conferir nome da animaçao
        loop: true,
        timeScale: 0.2,
      });
    }
  }, [scene, skipProduct, play, jumpToEnd]);

  useEffect(() => {
    if (playSecondAnimation) {
      play('AntenaVFX-Crescendo', { //conferir nome da animaçao
        loop: false,
        timeScale: 0.35,
        onFinish: onAnimationEnded
      });
    }
  }, [play, playSecondAnimation]);

  const onAnimationEnded = useCallback(() => {
    play('AntenaVFX-Loop', { //conferir nome da animaçao
      loop: true,
      timeScale: 0.15,
    });
  }, [play]);

  if (!scene) return null;

  return (
    <primitive
      object={scene}
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      frustumCulled={false}
    />
  );
};

export default Antena;