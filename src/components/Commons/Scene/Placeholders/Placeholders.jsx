import React, { useRef, useEffect, useCallback } from 'react';
import { useGLTFAnimations } from '../../../../hooks/useGLTFAnimations';

const MODEL_PATH = '/models/geral/Placeholder.glb';

const findObjectMesh = (object, meshName) => {
  const targetObject = object.getObjectByName(meshName);

  if (targetObject && targetObject.isMesh) {
    return targetObject;
  }

  return null;
};

const Placeholder = ({ 
  position, 
  rotation = [0, 0, 0], 
  scale = 1,
  index = 0, 
  isVisible = false,
  onAnimationOutEnded = () => { }
}) => {
   const meshRef = useRef();
   const { scene, play } = useGLTFAnimations(MODEL_PATH, {
     cloneScene: true,
   });
 
   useEffect(() => {
    if (isVisible) {
      if (!scene) return;
 
      // Desabilitando frustum culling
      const objectNames = ['Cone'];
      objectNames.forEach(name => {
        const objectMesh = findObjectMesh(scene, name);
        if (objectMesh) {
          objectMesh.frustumCulled = false;
        }
      });
  
      play('Placeholder_Crescendo', {
       loop: false,
       timeScale: 2.0
     });

    } else {

      play('Placeholder_Crescendo', {
        loop: false,
        timeScale: -2.0,
        onFinish: onAnimationOutEnded
      });
    }
  }, [isVisible]);

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

export const Placeholders = ({ placeholderPositions, scale = 1, isVisible = true, onAnimationOutEnded }) => {
  return (
    <>
      {placeholderPositions.map((position, index) => (
        <Placeholder 
          key={index}
          position={position}
          scale={scale}
          index={index}
          isVisible={isVisible}
          onAnimationOutEnded={onAnimationOutEnded}
        />
      ))}
    </>    
  );
};

export default Placeholders;