import React from 'react';
import BigButton from './BigButton/BigButton';

const ProductSecontInteraction = ({ 
  buttonPosition, 
  onButtonClick 
}) => {
    
  return (
    <group>
      <BigButton 
        position={buttonPosition} 
        onClick={onButtonClick} 
      />
    </group> 
  );
};

export default ProductSecontInteraction;