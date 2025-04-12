import React, { useState, useEffect } from 'react';
import useSlotsStore from '../../../../stores/SlotsStore';
import Slot from './Slot/Slot';
import './Slots.css';

const Slots = () => {
  const { selectedIndex, setSelectedIndex, showSlots, slotsLength, setShowSlots } = useSlotsStore();
  const [shouldRender, setShouldRender] = useState(showSlots);
  const [animationEnded, setAnimationEnded] = useState(false);

  useEffect(() => {
    if (showSlots) {
      setShouldRender(true);
      setAnimationEnded(false);
    }
  }, [showSlots]);

  const handleSlotClick = (index) => {
    setSelectedIndex(index);
    setShowSlots(false);
  };

  const handleAnimationOutEnded = () => {
    if (!animationEnded) {
      setAnimationEnded(true);
      setShouldRender(false);
    }
  };

  if (!shouldRender) return null;

  const slots = Array.from({ length: slotsLength }).map((_, index) => (
    <Slot 
      key={index}
      index={index}
      onSelected={() => handleSlotClick(index)}
      onAnimationOutEnded={handleAnimationOutEnded}
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