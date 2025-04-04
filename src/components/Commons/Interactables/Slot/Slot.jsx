import React from 'react';
import { Html } from '@react-three/drei';
import './Slot.css'; 

const Slot = ({ 
  position,
  onClick 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(position);
    }
  };

  return (
    <group position={position}>
      <Html
        position={[0, 2, 0]}
        center
        distanceFactor={10}
        zIndexRange={[100, 0]}
        transform
        sprite
      >
        <div 
          className="slot-container"
          onClick={handleClick}
        >
          <div className="slot-outer-circle"></div>
          <div className="slot-inner-circle"></div>
        </div>
      </Html>
    </group>
  );
};

export default Slot;