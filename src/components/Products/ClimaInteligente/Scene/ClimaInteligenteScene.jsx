import React from 'react';
import ProductFirstInteraction from '../../../Commons/Scene/ProductFirstInteraction';
import ProductSecondInteraction from '../../../Commons/Scene/ProductSecondInteraction';
import useProductScene from '../../../../hooks/useProductScene';

const ClimaInteligenteScene = () => {
  const {
    enableObject,
    showFirstInteraction,
    showSecondInteraction,
    isCurrentProduct,
    selectedPosition,
    handleSlotClick,
    handleButtonClick,
  } = useProductScene('clima-inteligente');
  
  const placeholderPositions = [
    [-10, 0, 10],
    [0, 0, 10],
    [10, 0, 10],
  ];
  
  const buttonPosition = [0, 1.2, 0.5];

  return (
    <group>
{/*       {enableObject && selectedPosition && (
        <Dispositivo position={selectedPosition} />
      )} */}
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

export default ClimaInteligenteScene;
  
