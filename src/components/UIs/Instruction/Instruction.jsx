import React from 'react';
import './Instruction.css';

const Instruction = ({ title, description }) => {
  return (
    <div className="instruction">
      <div className="instruction-content">
        <h2 className="instruction-title">{title}</h2>
        <p className="instruction-description">{description}</p>
      </div>
    </div>
  );
};

export default Instruction;
