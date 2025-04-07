import React from 'react';
import ProductFirstInteraction from '../../../Commons/Scene/ProductFirstInteraction';
import ProductSecondInteraction from '../../../Commons/Scene/ProductSecondInteraction';
import Antena from '../../../Scene/Objects/Experiencia/Products/AgroCobertura/Antena';
import useProductScene from '../../../../hooks/useProductScene';

const AgroCoberturaScene = () => {
  const {
    enableObject,
    showFirstInteraction,
    showSecondInteraction,
    isCurrentProduct,
    selectedPosition,
    handleSlotClick,
    handleButtonClick,
  } = useProductScene('agro-cobertura');
  
  const placeholderPositions = [
    [50, 0, -20],
    [50, 0, 5],
    [50, 0, 35],
  ];
  
  const buttonPosition = [0.5, 1.2, 0];

  return (
    <group>
      {enableObject && selectedPosition && (
        <Antena position={selectedPosition} />
      )}
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

export default AgroCoberturaScene;