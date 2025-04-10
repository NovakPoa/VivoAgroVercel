import React, { useState, useEffect } from 'react';
import ProductFirstInteraction from '../../../Commons/Scene/ProductFirstInteraction';
import useProductScene from '../../../../hooks/useProductScene';
import Tratores from '../../../Scene/Objects/Experiencia/Products/GestaoMaquinario/Tratores';
import DispositivoMaquinario from '../../../Scene/Objects/Experiencia/Products/GestaoMaquinario/DispositivoMaquinario';

const INITIAL_PLACEHOLDER_POSITIONS = [
  [50, 0, -20],
  [50, 0, 5],
  [50, 0, 35],
];

const INTERACTION_OBJECT_POSITION = [0, 1.2, 0.5];

const GestaoMaquinarioScene = () => {
  const {
    enableObject,
    showFirstInteraction,
    isCurrentProduct,
    selectedPosition,
    placeholderPositions,
    setPlaceholderPositions
  } = useProductScene('gestao-maquinario', INITIAL_PLACEHOLDER_POSITIONS);
  
  const handleObjectPositionUpdate = (position, tratorIndex) => {
    if (position) {
      setPlaceholderPositions(prevPositions => {
        const newPositions = [...prevPositions];
        if (tratorIndex >= 0 && tratorIndex < newPositions.length) {
          newPositions[tratorIndex] = [position.x, position.y, position.z];
        }
        return newPositions;
      });
    }
  };

  return (
    <group>
      <Tratores onObjectPositionUpdate={handleObjectPositionUpdate} />

      {showFirstInteraction && isCurrentProduct && (
        <>
          <ProductFirstInteraction 
            placeholderPositions={placeholderPositions}
          />
          <DispositivoMaquinario position={INTERACTION_OBJECT_POSITION} scale={0.08} />
        </>
      )}
    </group>
  );
};

export default GestaoMaquinarioScene;