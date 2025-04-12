import React, { useState, useEffect } from 'react';
import Placeholders from '../../../Commons/Scene/Placeholders/Placeholders';
import useProductScene from '../../../../hooks/useProductScene';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';
import Vacas from '../../../Scene/Objects/Experiencia/Products/GestaoPecuaria/Vacas';
import DispositivosPecuaria from '../../../Scene/Objects/Experiencia/Products/GestaoPecuaria/DispositivosPecuaria';
import Brinco from '../../../Scene/Objects/Experiencia/Products/GestaoPecuaria/Brinco';
import Tablet from '../../../Scene/Objects/Experiencia/Products/Tablet';

const INITIAL_PLACEHOLDER_POSITIONS = [
  [-20, 0, 10],
  [5, 0, 10],
];
const INTERACTION_OBJECT_POSITION = [0, 1.2, -0.5];
const CAMERA_ROTATION = [0, 0, 0];
const TABLET = {
  position: [-0.1, 1.2, -0.8],
  rotation: [0, 0.9, 0],
  scale: 0.015,
};

const GestaoPecuariaScene = () => {
  const {
    enableObject,
    showFirstInteraction,
    isCurrentProduct,
    selectedPosition,
    placeholderPositions,
    setPlaceholderPositions,
    animateTablet
  } = useProductScene('gestao-pecuaria', INITIAL_PLACEHOLDER_POSITIONS, CAMERA_ROTATION);
  
  const [placeholdersVisible, setPlaceholdersVisible] = useState(false);
  const [shouldRenderPlaceholders, handleAnimationOutEnded] = useComponentVisibility(placeholdersVisible);

  useEffect(() => {
    setPlaceholdersVisible(showFirstInteraction && isCurrentProduct);
  }, [showFirstInteraction, isCurrentProduct]);

  const handleObjectPositionUpdate = (position, vacaIndex) => {
    if (position) {
      setPlaceholderPositions(prevPositions => {
        const newPositions = [...prevPositions];
        if (vacaIndex >= 0 && vacaIndex < newPositions.length) {
          newPositions[vacaIndex] = [position.x, position.y, position.z];
        }
        return newPositions;
      });
    }
  };

  return (
    <group>
      <DispositivosPecuaria />
      <Vacas onObjectPositionUpdate={handleObjectPositionUpdate} />

      {enableObject && selectedPosition && (
        <Brinco position={selectedPosition} />
      )} 

      {shouldRenderPlaceholders && (
        <>
          <Placeholders 
            placeholderPositions={placeholderPositions}
            isVisible={placeholdersVisible}
            onAnimationOutEnded={handleAnimationOutEnded}
          />
          <Brinco position={INTERACTION_OBJECT_POSITION} scale={0.5} />
        </>
      )}
      
      <Tablet position={TABLET.position} rotation={TABLET.rotation} scale={TABLET.scale} animateTablet={animateTablet} />
    </group>
  );
};

export default GestaoPecuariaScene;
  
