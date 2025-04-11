import React, { useState, useEffect } from 'react';
import './Slot.css';

const Slot = ({ onSelected, isActive, index = 0, isVisible = true }) => {
  const [animState, setAnimState] = useState('initial'); // 'initial', 'visible', 'hiding'
  
  useEffect(() => {
    if (isVisible) {
      const showTimer = setTimeout(() => {
        setAnimState('visible');
      }, index * 100);
      
      return () => clearTimeout(showTimer);
    } else if (animState === 'visible') {
      setAnimState('hiding');
    }
  }, [isVisible, animState, index]);
  
  const animClass = 
    animState === 'initial' ? 'hidden' :
    animState === 'visible' ? 'visible' : 
    'hiding';

  return (
    <div 
      className={`slot-ui-container ${isActive ? 'active' : ''} ${animClass}`} 
      onClick={animState !== 'hiding' ? onSelected : undefined}
    >
      <div className="slot-outer-circle"></div>
      <div className="slot-inner-circle"></div>
    </div>
  );
};

export default Slot;