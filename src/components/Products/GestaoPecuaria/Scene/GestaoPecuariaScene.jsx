import React, { useState, useEffect } from 'react';
import ProductFirstInteraction from '../../../Commons/Scene/ProductFirstInteraction';
import useProductScene from '../../../../hooks/useProductScene';
import Vacas from '../../../Scene/Objects/Experiencia/Products/GestaoPecuaria/Vacas';
import DispositivosPecuaria from '../../../Scene/Objects/Experiencia/Products/GestaoPecuaria/DispositivosPecuaria';
import Brinco from '../../../Scene/Objects/Experiencia/Products/GestaoPecuaria/Brinco';

const INITIAL_PLACEHOLDER_POSITIONS = [
  [-20, 0, 10],
  [5, 0, 10],
];
const INTERACTION_OBJECT_POSITION = [0, 1.2, -0.5];
const CAMERA_ROTATION = [0, 0, 0];

const GestaoPecuariaScene = () => {
  const {
    enableObject,
    showFirstInteraction,
    isCurrentProduct,
    selectedPosition,
    placeholderPositions,
    setPlaceholderPositions
  } = useProductScene('gestao-pecuaria', INITIAL_PLACEHOLDER_POSITIONS, CAMERA_ROTATION);
  
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

      {showFirstInteraction && isCurrentProduct && (
        <>
          <ProductFirstInteraction 
            placeholderPositions={placeholderPositions}
          />
          <Brinco position={INTERACTION_OBJECT_POSITION} scale={0.5} />
        </>
      )}
    </group>
  );
};

export default GestaoPecuariaScene;
  
