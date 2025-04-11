import React, { useState, useEffect } from 'react';
import './Slot.css';

const Slot = ({ onSelected, isActive, index = 0 }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, index * 100);
    
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
      className={`slot-ui-container ${isActive ? 'active' : ''}`} 
      onClick={onSelected}
      style={{ 
        animation: visible ? 'scaleIn 0.5s ease-out forwards' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0)'
      }}
    >
      <div className="slot-outer-circle"></div>
      <div className="slot-inner-circle"></div>
    </div>
  );
};

export default Slot;