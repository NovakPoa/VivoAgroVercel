import React from 'react';
import Placeholder from '../../Scene/Objects/Interactions/PlaceholderObjects/Placeholder';
import Slot from './Slot/Slot';

const ProductFirstInteraction = ({ 
  placeholderPositions, 
  onSlotClick 
}) => {
    
  const renderPlaceholders = () => {
    return placeholderPositions.map((position, index) => (
      <Placeholder 
        key={index}
        position={position}
      />
    ));
  };
  
  const renderSlots = () => {
    return (
      <group position={[0, 0, 0]}>
        {placeholderPositions.map((position, index) => (
          <Slot 
            key={index}
            position={position}
            onClick={() => onSlotClick(position)}
          />
        ))}
      </group>
    );
  };
    
  return (
    <>
      {renderPlaceholders()}
      {renderSlots()}   
    </>    
  );
};

export default ProductFirstInteraction;