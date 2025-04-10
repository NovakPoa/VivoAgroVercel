import React from 'react';
import ProductFirstInteraction from '../../../Commons/Scene/ProductFirstInteraction';
import useProductScene from '../../../../hooks/useProductScene';
import Estacao from '../../../Scene/Objects/Experiencia/Products/ClimaInteligente/Estacao';

const INITIAL_PLACEHOLDER_POSITIONS = [
  [10, 0, 10],
  [0, 0, 10],
  [-10, 0, 10],
];
const INTERACTION_OBJECT_POSITION = [0, 1.2, 0.5];
const CAMERA_ROTATION = [0, -180, 0];

const ClimaInteligenteScene = () => {
  const {
    enableObject,
    showFirstInteraction,
    isCurrentProduct,
    selectedPosition,
    placeholderPositions
  } = useProductScene('clima-inteligente', INITIAL_PLACEHOLDER_POSITIONS, CAMERA_ROTATION);
  
  return (
    <group>
      {enableObject && selectedPosition && (
        <Estacao position={selectedPosition} />
      )}    
      {showFirstInteraction && isCurrentProduct && (
        <>
          <ProductFirstInteraction 
            placeholderPositions={placeholderPositions}
          />
          <Estacao position={INTERACTION_OBJECT_POSITION} scale={0.1} />
        </>
      )}
    </group>
  );
};

export default ClimaInteligenteScene;