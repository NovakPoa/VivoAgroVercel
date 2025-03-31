import React from 'react';
import Instruction from '../../../Commons/UI/Instruction/Instruction';

const ClimaInteligenteInstruction1 = ({ isVisible }) => {
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

export default ClimaInteligenteInstruction1;