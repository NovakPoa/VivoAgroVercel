import React, { useState, useEffect } from 'react';
import useSlotsStore from '../../../../stores/SlotsStore';
import Slot from './Slot/Slot';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';
import './Slots.css';

const Slots = () => {
  const { selectedIndex, setSelectedIndex, showSlots, slotsLength, setShowSlots } = useSlotsStore();
  
  const shouldRender = useComponentVisibility(showSlots);

  const handleSlotClick = (index) => {
    setSelectedIndex(index);
    setShowSlots(false);
  };

  if (!shouldRender) return null;

  const slots = Array.from({ length: slotsLength }).map((_, index) => (
    <Slot 
      key={index}
      index={index}
      isActive={selectedIndex === index}
      onSelected={() => handleSlotClick(index)}
      isVisible={showSlots}
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