import React, { useState, useEffect } from 'react';
import Placeholders from '../../../Commons/Scene/Placeholders/Placeholders';
import useProductScene from '../../../../hooks/useProductScene';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';
import Antena from '../../../Scene/Objects/Experiencia/Products/AgroCobertura/Antena';
import Tablet from '../../../Scene/Objects/Experiencia/Products/Tablet';
import AgroCoberturaTabletContent from '../UI/AgroCoberturaTabletContent';

const INITIAL_PLACEHOLDER_POSITIONS = [
  [50, 0, -20],
  [50, 0, 5],
  [50, 0, 35],
];
const INTERACTION_OBJECT_POSITION = [0.5, 1.2, 0];
const CAMERA_ROTATION = [0, -90, 0];
const TABLET = {
  position: [1.1, 1.2, 0.4],
  rotation: [0, -1.9, 0],
  scale: 0.015,
};

const AgroCoberturaScene = () => {
  const {
    enableObject,
    selectedPosition,
    placeholderPositions,
    animateTablet,
    shouldRenderPlaceholders,
    placeholdersVisible,
    handleAnimationOutEnded    
  } = useProductScene('agro-cobertura', INITIAL_PLACEHOLDER_POSITIONS, CAMERA_ROTATION);

  return (
    <group>
      {enableObject && selectedPosition && (
        <Antena position={selectedPosition} />
      )}   

      {shouldRenderPlaceholders && (
        <>
          <Placeholders 
            placeholderPositions={placeholderPositions}
            isVisible={placeholdersVisible} 
            onAnimationOutEnded={handleAnimationOutEnded}
          />
          <Antena position={INTERACTION_OBJECT_POSITION} scale={0.015} />
        </>
      )}
      
      <Tablet position={TABLET.position} rotation={TABLET.rotation} scale={TABLET.scale} animateTablet={animateTablet}>
        <AgroCoberturaTabletContent />
      </Tablet>
    </group>
  );
};

export default AgroCoberturaScene;