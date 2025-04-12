import React, { useState, useEffect } from 'react';
import { ANIMATION_DURATIONS } from '../../../../config/animationConfig';
import './Instruction.css';

const Instruction = ({ title, description, children, isVisible = true, onAnimationOutEnded }) => {
  const [animState, setAnimState] = useState('initial'); // 'initial', 'visible', 'hiding'
    
  useEffect(() => {
    if (isVisible) {
      setAnimState('visible')
    } else if (animState === 'visible') {
      setAnimState('hiding');
    }
  }, [isVisible]);

  useEffect(() => {
    if (animState === 'hiding') {
      const endTimer = setTimeout(() => { if (onAnimationOutEnded) onAnimationOutEnded(); }, ANIMATION_DURATIONS.INSTRUCTION.SCALE_OUT);
      return () => { clearTimeout(endTimer); };
    }
  }, [animState]);

  const style = {
    '--instruction-scale-in-duration': `${ANIMATION_DURATIONS.INSTRUCTION.SCALE_IN}ms`,
    '--instruction-scale-out-duration': `${ANIMATION_DURATIONS.INSTRUCTION.SCALE_OUT}ms`
  };

  const animClass = 
    animState === 'initial' ? 'hidden' :
    animState === 'visible' ? 'visible' : 
    'hiding';
  
  const hasExtras = React.Children.count(children) > 0;

  return (
    <div className={`instruction ${hasExtras ? 'with-extras' : ''} ${animClass}`} style={style} >
      <div className="instruction-content">
        <h2 className="instruction-title">{title}</h2>
        <p className="instruction-description">{description}</p>
        
        {hasExtras && (
          <div className="instruction-extra">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Instruction;