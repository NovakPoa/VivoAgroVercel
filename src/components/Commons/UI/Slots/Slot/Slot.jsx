import React, { useState, useEffect, useRef } from 'react';
import './Slot.css';

const SLOT_SCALE_IN_DURATION = 500;
const SLOT_SCALE_OUT_DURATION = 500;

const Slot = ({ onSelected, onAnimationOutEnded, index = 0, isVisible = true }) => {
  const [animState, setAnimState] = useState('initial'); // 'initial', 'visible', 'hiding'
  const isActiveRef = useRef(false);
  
  useEffect(() => {
    if (isVisible) {
      isActiveRef.current = false;
      const showTimer = setTimeout(() => { setAnimState('visible'); }, index * 100);
      return () => clearTimeout(showTimer);
    } else if (animState === 'visible') {
      setAnimState('hiding');
    }
  }, [isVisible]);
  
  useEffect(() => {
    if (animState === 'hiding') {
      const endTimer = setTimeout(() => { if (onAnimationOutEnded) onAnimationOutEnded(); }, SLOT_SCALE_OUT_DURATION);
      return () => { clearTimeout(endTimer); };
    }
  }, [animState]);
  
  const handleClick = () => {
    onSelected(index);
    isActiveRef.current = true;
  };

  const style = {
    '--slot-scale-in-duration': `${SLOT_SCALE_IN_DURATION}ms`,
    '--slot-scale-out-duration': `${SLOT_SCALE_OUT_DURATION}ms`
  };

  const animClass = 
    animState === 'initial' ? 'hidden' :
    animState === 'visible' ? 'visible' : 
    'hiding';

  return (
    <div 
      className={`slot-ui-container ${isActiveRef.current ? 'active' : ''} ${animClass}`} 
      onClick={animState !== 'hiding' ? handleClick : undefined}
      style={style}
    >
      <div className="slot-outer-circle"></div>
      <div className="slot-inner-circle"></div>
    </div>
  );
};

export default Slot;