import React, { useState, useEffect } from 'react';
import './Instruction.css';

const Instruction = ({ title, description, children, isVisible = true }) => {
  const [animState, setAnimState] = useState('initial'); // 'initial', 'visible', 'hiding'
  
  useEffect(() => {
    if (isVisible) {
      const showTimer = setTimeout(() => setAnimState('visible'), 30);
      return () => clearTimeout(showTimer);
    } else if (animState === 'visible') {
      setAnimState('hiding');
    }
  }, [isVisible, animState]);
  
  const animClass = 
    animState === 'initial' ? 'hidden' :
    animState === 'visible' ? 'visible' : 
    'hiding';
  
  const hasExtras = React.Children.count(children) > 0;

  return (
    <div className={`instruction ${hasExtras ? 'with-extras' : ''} ${animClass}`}>
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