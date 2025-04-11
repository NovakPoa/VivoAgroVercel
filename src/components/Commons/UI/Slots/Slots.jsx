import React, { useState } from 'react';
import useSlotsStore from '../../../../stores/SlotsStore';
import Slot from './Slot/Slot';
import './Slots.css';

const Slots = () => {
  const { selectedIndex, setSelectedIndex, showSlots, slotsLength } = useSlotsStore();
    
  const handleSlotClick = (index) => {
    setSelectedIndex(index);
  };
  
  if (!showSlots) return null;

  const slots = Array.from({ length: slotsLength }).map((_, index) => (
    <Slot 
      key={index}
      index={index}
      isActive={selectedIndex === index}
      onSelected={() => handleSlotClick(index)}
    />
  ));

  return (
    <div className="slots-container">
      <div className="slots-wrapper">
        {slots}
      </div>
    </div>   
  );
};

export default Slots;