import React from 'react';
import Placeholders from '../../../Commons/Scene/Placeholders/Placeholders';
import useProductScene from '../../../../hooks/useProductScene';
import Estacao from '../../../Scene/Objects/Experiencia/Products/ClimaInteligente/Estacao';
import EstacaoSmall from '../../../Scene/Objects/Experiencia/Products/ClimaInteligente/EstacaoSmall';
import Tablet from '../../../Scene/Objects/Experiencia/Products/Tablet';

const INITIAL_PLACEHOLDER_POSITIONS = [
  [8, 0, 25],
  [0, 0, 10],
  [-3, 0, 12],
];
const SMALL_OBJECT_POSITION = [0, 1.2, 0.5];
const CAMERA_ROTATION = [0, -180, 0];
const TABLET = {
  position: [0.4, 1.2, 0.8],
  rotation: [0, 0.2, 0],
  scale: 0.015,
};

const ClimaInteligenteScene = () => {
  const {
    enableObject,
    selectedPosition,
    placeholderPositions,
    animateTablet,
    shouldRenderPlaceholders,
    placeholdersVisible,
    handlePlaceholderAnimationOutEnded        
  } = useProductScene('clima-inteligente', INITIAL_PLACEHOLDER_POSITIONS, CAMERA_ROTATION);
  
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
            onAnimationOutEnded={handlePlaceholderAnimationOutEnded}
          />
          <EstacaoSmall position={SMALL_OBJECT_POSITION} scale={0.1} />
        </>
      )}

      <Tablet position={TABLET.position} rotation={TABLET.rotation} scale={TABLET.scale} animateTablet={animateTablet} />
    </group>
  );
};

export default ClimaInteligenteScene;