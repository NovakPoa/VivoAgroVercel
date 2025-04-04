import React, { useState, useEffect } from 'react';
import Antena from '../../../Scene/Objects/InteractiveObjects/Antena';
import ProductFirstInteraction from '../../../Scene/Objects/Interactions/ProductFirstInteraction';
import ProductSecondInteraction from '../../../Scene/Objects/Interactions/ProductSecondInteraction';
import useProductsStore from '../../../../stores/ProductsStore';

const AgroCoberturaInteraction = () => {
  const { 
    setShowFirstInstruction, 
    setShowSecondInstruction,
    showFirstInteraction,
    showSecondInteraction,
    setShowFirstInteraction,
    setShowSecondInteraction
  } = useProductsStore();
  const [selectedPosition, setSelectedPosition] = useState(null);
  
  const placeholderPositions = [
    [50, 0, -20],
    [50, 0, 5],
    [50, 0, 35],
  ];
  
  useEffect(() => {
    setShowFirstInstruction(true);
    setShowFirstInteraction(true);
  }, []);

  const handleSlotClick = (position) => {
    setSelectedPosition(position);
    setShowFirstInstruction(false);
    setShowFirstInteraction(false);
    setTimeout(() => {
      setShowSecondInstruction(true);
      setShowSecondInteraction(true);
    }, 1000);
  };
  
  const handleButtonClick = () => {
    setShowSecondInstruction(false);
    setShowSecondInteraction(false);
    setTimeout(() => {
      // show tablet
    }, 1000);
  };

  return (
    <>
      {showFirstInteraction && (
        <ProductFirstInteraction 
        placeholderPositions={placeholderPositions}
        onSlotClick={handleSlotClick}
        />
      )}
      
      {showSecondInteraction && (
        <ProductSecondInteraction 
        buttonPosition={placeholderPositions}
        onButtonClick={handleButtonClick}
        />
      )}   

      {selectedPosition && <Antena position={selectedPosition} />}
    </>
  );
};

export default AgroCoberturaInteraction;