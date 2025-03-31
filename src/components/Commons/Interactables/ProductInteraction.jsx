import React, { useState } from 'react';
import Placeholder from '../../Scene/Objects/PlaceholderObjects/Placeholder';
import useProductsStore from '../../../stores/ProductsStore';

const ProductInteraction = ({ 
  placeholderPositions, 
  onPlaceholderClick 
}) => {
  const [placeholdersVisible, setPlaceholdersVisible] = useState(true);
  const { setShowFirstInstruction } = useProductsStore();
  
  const handlePlaceholderClick = (position) => {
    setPlaceholdersVisible(false);
    setShowFirstInstruction(false);
    
    if (onPlaceholderClick) {
      onPlaceholderClick(position);
    }
  };
  
  return (
    <>
      {placeholdersVisible && placeholderPositions.map((position, index) => (
        <Placeholder 
          key={index}
          position={position}
          onClick={() => handlePlaceholderClick(position)}
        />
      ))}
    </>
  );
};

export default ProductInteraction;