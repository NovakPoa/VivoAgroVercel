import React, { useState, useEffect } from 'react';
import ProductFirstInteraction from '../../../Commons/Scene/ProductFirstInteraction';
import useProductScene from '../../../../hooks/useProductScene';
import Tratores from '../../../Scene/Objects/Experiencia/Products/GestaoMaquinario/Tratores';

const GestaoMaquinarioScene = () => {
  const {
    enableObject,
    showFirstInteraction,
    showSecondInteraction,
    isCurrentProduct,
    selectedPosition,
    handleSlotClick
  } = useProductScene('gestao-maquinario');
  
  const [placeholderPositions, setPlaceholderPositions] = useState([
    [-10, 0, 15],
    [0, 0, 30],
    [13, 0, 20],
  ]);

  const handleObjectPositionUpdat = (position, tratorIndex) => {
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
      <Tratores onObjectPositionUpdate={handleObjectPositionUpdat} />

      {showFirstInteraction && isCurrentProduct && (
        <ProductFirstInteraction 
          placeholderPositions={placeholderPositions}
          onSlotClick={handleSlotClick}
        />
      )}
    </group>
  );
};

export default GestaoMaquinarioScene;