import React from 'react';
import Instruction from '../../../UIs/Instruction/Instruction';

const AgroCoberturaInstruction1 = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="instruction-container">
      <Instruction 
        title="Aplique o dispositivo no gado" 
        description="Arraste o dispositivo abaixo para começar a receber os dados da Gestão Pecuária." 
      />
    </div>
  );
};

export default AgroCoberturaInstruction1;