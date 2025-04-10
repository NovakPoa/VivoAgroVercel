import React from 'react';
import ProductFirstInteraction from '../../../Commons/Scene/ProductFirstInteraction';
import useProductScene from '../../../../hooks/useProductScene';
import Antena from '../../../Scene/Objects/Experiencia/Products/AgroCobertura/Antena';

const INITIAL_PLACEHOLDER_POSITIONS = [
  [50, 0, -20],
  [50, 0, 5],
  [50, 0, 35],
];
const INTERACTION_OBJECT_POSITION = [0.5, 1.2, 0];
const CAMERA_ROTATION = [0, -90, 0];

const AgroCoberturaScene = () => {
  const {
    enableObject,
    showFirstInteraction,
    isCurrentProduct,
    selectedPosition,
    placeholderPositions
  } = useProductScene('agro-cobertura', INITIAL_PLACEHOLDER_POSITIONS, CAMERA_ROTATION);

  return (
    <group>
      {enableObject && selectedPosition && (
        <Antena position={selectedPosition} />
      )}    
      {showFirstInteraction && isCurrentProduct && (
        <>
          <ProductFirstInteraction 
            placeholderPositions={placeholderPositions}
          />
          <Antena position={INTERACTION_OBJECT_POSITION} scale={0.015} />
        </>
      )}
    </group>
  );
};

export default AgroCoberturaScene;