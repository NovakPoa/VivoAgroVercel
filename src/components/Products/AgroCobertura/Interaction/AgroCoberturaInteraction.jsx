// src/components/Products/AgroCobertura/Interaction/AgroCoberturaInteraction.jsx
import React, { useState } from 'react';
import Tower from '../../../Scene/Objects/InteractiveObjects/Tower';
import Placeholder from '../../../Scene/Objects/PlaceholderObjects/Placeholder';
import ProductInteraction from '../../../Commons/Interactables/ProductInteraction';
import useProductsStore from '../../../../stores/ProductsStore';

const AgroCoberturaInteraction = () => {
  const { setShowSecondInstruction } = useProductsStore();
  const [selectedPosition, setSelectedPosition] = useState(null);
  
  const placeholderPositions = [
    [-5, 0, -8],
    [0, 0, -8],
    [5, 0, -8],
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
      
      {selectedPosition && <Tower position={selectedPosition} />}
    </>
  );
};

export default AgroCoberturaInteraction;