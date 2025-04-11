import React, { useState, useEffect } from 'react';
import './Instruction.css';

const Instruction = ({ title, description, children }) => {

  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 30);
    
    return () => clearTimeout(timer);
  }, []);

  const hasExtras = React.Children.count(children) > 0;

  return (
    <div className={`instruction ${hasExtras ? 'with-extras' : ''} ${visible ? 'visible' : 'hidden'}`}>
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