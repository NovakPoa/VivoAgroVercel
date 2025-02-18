import React from 'react';
import Instruction from '../UIs/Instruction/Instruction';

const AgroCoberturaInstruction1 = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="instruction-container">
      <Instruction 
        title="Instale a estação meteorológica" 
        description="Arraste a estação abaixo para escolher onde instalar sua estação do Clima Inteligente." 
      />
    </div>
  );
};

export default AgroCoberturaInstruction1;