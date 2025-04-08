import React, { useState, useEffect } from 'react';
import ProductFirstInteraction from '../../../Commons/Scene/ProductFirstInteraction';
import ProductSecondInteraction from '../../../Commons/Scene/ProductSecondInteraction';
import useProductScene from '../../../../hooks/useProductScene';
import Tratores from '../../../Scene/Objects/Experiencia/Products/GestaoMaquinario/Tratores';

const GestaoMaquinarioScene = () => {
  const {
    enableObject,
    showFirstInteraction,
    showSecondInteraction,
    isCurrentProduct,
    selectedPosition,
    handleSlotClick,
    handleButtonClick,
  } = useProductScene('gestao-maquinario');
  
  const [placeholderPositions, setPlaceholderPositions] = useState([
    [-10, 0, 15],
    [0, 0, 30],
    [13, 0, 20],
  ]);
  
  const buttonPosition = [0, 1.2, 0.5];

  return (
    <group>
      <Tratores />

      {showFirstInteraction && isCurrentProduct && (
        <ProductFirstInteraction 
          placeholderPositions={placeholderPositions}
          onSlotClick={handleSlotClick}
        />
      )}
      
      {showSecondInteraction && isCurrentProduct && (
        <ProductSecondInteraction 
          buttonPosition={buttonPosition}
          onButtonClick={handleButtonClick}
        />
      )}
    </group>
  );
};

export default GestaoMaquinarioScene;