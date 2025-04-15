import React, { useState, useEffect, useRef } from 'react';
import Placeholders from '../../../Commons/Scene/Placeholders/Placeholders';
import useProductScene from '../../../../hooks/useProductScene';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';
import Tratores from '../../../Scene/Objects/Experiencia/Products/GestaoMaquinario/Tratores';
import DispositivoMaquinario from '../../../Scene/Objects/Experiencia/Products/GestaoMaquinario/DispositivoMaquinario';
import Tablet from '../../../Scene/Objects/Experiencia/Products/Tablet';

const INITIAL_PLACEHOLDER_POSITIONS = [
  [50, 0, -20],
  [50, 0, 5],
  [50, 0, 35],
];
const INTERACTION_OBJECT_POSITION = [0, 1.2, 0.5];
const CAMERA_ROTATION = [0, -180, 0];
const TABLET = {
  position: [-0.4, 1.2, 0.8],
  rotation: [0, 0.2, 0],
  scale: 0.015,
};

const GestaoMaquinarioScene = () => {
  const {
    enableObject,
    isCurrentProduct,
    selectedPosition,
    animateTablet,
    selectedIndex,
    shouldRenderPlaceholders,
    placeholdersVisible,
    handleAnimationOutEnded    
  } = useProductScene('gestao-maquinario', INITIAL_PLACEHOLDER_POSITIONS, CAMERA_ROTATION);
  
  const tratorPositionsRef = useRef(INITIAL_PLACEHOLDER_POSITIONS);
  const trackedTratorIndexRef = useRef(-1);

  const [dispositivoPosition, setDispositivoPosition] = useState(selectedPosition);
  const [placeholderPositions, setPlaceholderPositions] = useState(INITIAL_PLACEHOLDER_POSITIONS);

  useEffect(() => {
    if (selectedIndex >= 0 && isCurrentProduct) {
      trackedTratorIndexRef.current = selectedIndex;
      if (tratorPositionsRef.current[selectedIndex]) {
        setDispositivoPosition(tratorPositionsRef.current[selectedIndex]);
      }
    }
  }, [selectedIndex, isCurrentProduct]);

  const handleObjectPositionUpdate = (position, tratorIndex) => {
    if (position) {
      tratorPositionsRef.current[tratorIndex] = [position.x, position.y, position.z]; 
      // Atualizar os placeholders
      setPlaceholderPositions(prevPositions => {
        const newPositions = [...prevPositions];
        if (tratorIndex >= 0 && tratorIndex < newPositions.length) {
          newPositions[tratorIndex] = [position.x, position.y, position.z];
        }
        return newPositions;
      });
      // Atualizar a posição do dispositivo
      if (enableObject && trackedTratorIndexRef.current === tratorIndex) {
        setDispositivoPosition([position.x, position.y, position.z]);
      }
    }
  };

  return (
    <group>
      <Tratores onObjectPositionUpdate={handleObjectPositionUpdate} />

      {enableObject && dispositivoPosition && trackedTratorIndexRef.current >= 0 && (
        <DispositivoMaquinario 
          position={dispositivoPosition} 
          scale={1.5}
        />
      )}

      {shouldRenderPlaceholders && (
        <>
          <Placeholders 
            placeholderPositions={placeholderPositions}
            isVisible={placeholdersVisible}
            onAnimationOutEnded={handleAnimationOutEnded}
          />
          <DispositivoMaquinario position={INTERACTION_OBJECT_POSITION} scale={0.08} />
        </>
      )}
      
      <Tablet position={TABLET.position} rotation={TABLET.rotation} scale={TABLET.scale} animateTablet={animateTablet}/>
    </group>
  );
};

export default GestaoMaquinarioScene;