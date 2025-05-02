import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ANIMATION_DURATIONS } from '../../../../../config/animationUIConfig';
import useSoundStore from '../../../../../stores/SoundStore';
import './Slot.css';

const Slot = ({ onSelected, onAnimationOutEnded, index = 0, isVisible = true, className = '' }) => {
  const [animState, setAnimState] = useState('initial'); // 'initial', 'visible', 'hiding'
  const isActiveRef = useRef(false);
  const { playSound } = useSoundStore();  
  
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
      const endTimer = setTimeout(() => { if (onAnimationOutEnded) onAnimationOutEnded(); }, ANIMATION_DURATIONS.SLOT.SCALE_OUT);
      return () => { clearTimeout(endTimer); };
    }
  }, [animState]);

  const handleClick = useCallback(() => {

    playSound('SLOT_CLICK', { volume: 0.5 });

    onSelected(index);
    isActiveRef.current = true;
  }, [playSound]);

  const style = {
    '--slot-scale-in-duration': `${ANIMATION_DURATIONS.SLOT.SCALE_IN}ms`,
    '--slot-scale-out-duration': `${ANIMATION_DURATIONS.SLOT.SCALE_OUT}ms`
  };

  const animClass = 
    animState === 'initial' ? 'hidden' :
    animState === 'visible' ? 'visible' : 
    'hiding';

  return (
    <div 
      className={`slot-ui-container ${isActiveRef.current ? 'active' : ''} ${animClass} ${className}`} 
      onClick={animState !== 'hiding' ? handleClick : undefined}
      style={style}
    >
      <div className="slot-circle"></div>
    </div>
  );
};

export default Slot;