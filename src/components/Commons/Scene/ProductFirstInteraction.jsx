import React from 'react';
import Placeholder from './Placeholder/Placeholder';

const ProductFirstInteraction = ({ placeholderPositions }) => {
    
  const renderPlaceholders = () => {
    return placeholderPositions.map((position, index) => (
      <Placeholder 
        key={index}
        position={position}
      />
    ));
  };
    
  return (
    <>
      {renderPlaceholders()} 
    </>    
  );
};

export default ProductFirstInteraction;