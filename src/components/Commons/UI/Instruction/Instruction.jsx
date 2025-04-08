import React from 'react';
import './Instruction.css';

const Instruction = ({ title, description, children }) => {

  const hasExtras = React.Children.count(children) > 0;

  return (
    <div className={`instruction ${hasExtras ? 'with-extras' : ''}`}>
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