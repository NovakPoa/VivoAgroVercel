import React from 'react';
import Instruction from '../UIs/Instruction/Instruction';

const AgroCoberturaInstruction1 = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="instruction-container">
      <Instruction 
        title="Leve cobertura aonde você mais precisa" 
        description="Arraste a torre abaixo para escolher onde instalar sua primeira antena do Agro Cobertura Móvel." 
      />
    </div>
  );
};

export default AgroCoberturaInstruction1;