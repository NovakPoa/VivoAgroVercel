// src/components/Products/AgroCobertura/Interaction/AgroCoberturaInteraction.jsx
import React, { useState } from 'react';
import Antena from '../../../Scene/Objects/InteractiveObjects/Antena';
import ProductInteraction from '../../../Commons/Interactables/ProductInteraction';
import useProductsStore from '../../../../stores/ProductsStore';

const AgroCoberturaInteraction = () => {
  const { setShowSecondInstruction } = useProductsStore();
  const [selectedPosition, setSelectedPosition] = useState(null);
  
  const placeholderPositions = [
    [50, 0, -20],
    [50, 0, 5],
    [50, 0, 35],
  ];
  
  const handlePlaceholderClick = (position) => {
    setSelectedPosition(position);
    setTimeout(() => {
      setShowSecondInstruction(true);
    }, 1000);
  };
  
  return (
    <>
      <ProductInteraction 
        placeholderPositions={placeholderPositions}
        onPlaceholderClick={handlePlaceholderClick}
      />
      
      {selectedPosition && <Antena position={selectedPosition} />}
    </>
  );
};

export default AgroCoberturaInteraction;