import React, { useState, useEffect } from 'react';
import Placeholders from '../../../Commons/Scene/Placeholders/Placeholders';
import useProductScene from '../../../../hooks/useProductScene';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';
import Estacao from '../../../Scene/Objects/Experiencia/Products/ClimaInteligente/Estacao';
import Tablet from '../../../Scene/Objects/Experiencia/Products/Tablet';

const INITIAL_PLACEHOLDER_POSITIONS = [
  [10, 0, 10],
  [0, 0, 10],
  [-10, 0, 10],
];
const INTERACTION_OBJECT_POSITION = [0, 1.2, 0.5];
const CAMERA_ROTATION = [0, -180, 0];
const TABLET = {
  position: [0.4, 1.2, 0.8],
  rotation: [0, 0.2, 0],
  scale: 0.015,
};

const ClimaInteligenteScene = () => {
  const {
    enableObject,
    showFirstInteraction,
    isCurrentProduct,
    selectedPosition,
    placeholderPositions,
    animateTablet
  } = useProductScene('clima-inteligente', INITIAL_PLACEHOLDER_POSITIONS, CAMERA_ROTATION);
  
  const [placeholdersVisible, setPlaceholdersVisible] = useState(false);
  const [shouldRenderPlaceholders, handleAnimationOutEnded] = useComponentVisibility(placeholdersVisible);

  useEffect(() => {
    setPlaceholdersVisible(showFirstInteraction && isCurrentProduct);
  }, [showFirstInteraction, isCurrentProduct]);

  return (
    <group>
      {enableObject && selectedPosition && (
        <Estacao position={selectedPosition} />
      )}    

      {shouldRenderPlaceholders && (
        <>
          <Placeholders 
            placeholderPositions={placeholderPositions}
            isVisible={placeholdersVisible}
            onAnimationOutEnded={handleAnimationOutEnded}
          />
          <Estacao position={INTERACTION_OBJECT_POSITION} scale={0.1} />
        </>
      )}

      <Tablet position={TABLET.position} rotation={TABLET.rotation} scale={TABLET.scale} animateTablet={animateTablet} />
    </group>
  );
};

export default ClimaInteligenteScene;