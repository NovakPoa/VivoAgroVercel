import React, { useCallback } from 'react';
import useSlotsStore from '../../../../stores/SlotsStore';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';
import Slot from './Slot/Slot';
import './Slots.css';

const Slots = () => {
  const { setSelectedIndex, showSlots, slotsLength, setShowSlots } = useSlotsStore();
  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(showSlots);

  const handleSlotClick = useCallback((index) => {
    setSelectedIndex(index);
    setShowSlots(false);
  }, []);

  if (!shouldRender) return null;

  const slots = Array.from({ length: slotsLength }).map((_, index) => {
    const isMiddleSlot = slotsLength === 3 && index === 1;
    
    return (
      <Slot 
        key={index}
        index={index}
        onSelected={() => handleSlotClick(index)}
        onAnimationOutEnded={handleAnimationOutEnded}
        isVisible={showSlots}
        className={isMiddleSlot ? 'middle-slot' : ''}
      />
    );
  });

  return (
    <div className="slots-container">
      <div className="slots-wrapper">
        {slots}
      </div>
    </div>   
  );
};

export default Slots;