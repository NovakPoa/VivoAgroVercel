import React from 'react';
import './Slot.css';

const Slot = ({ onSelected, isActive }) => {
  return (
    <div 
      className={`slot-ui-container ${isActive ? 'active' : ''}`} 
      onClick={onSelected}
    >
      <div className="slot-outer-circle"></div>
      <div className="slot-inner-circle"></div>
    </div>
  );
};

export default Slot;