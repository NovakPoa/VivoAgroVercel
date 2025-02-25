import React from 'react';
import Instruction from '../../../Commons/UI/Instruction/Instruction';

const AgroCoberturaInstruction2 = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="instruction-container">
      <Instruction 
        title="Ative sua estação meteorológica" 
        description="Pressione o botão para ativar sua estação e começar a receber dados do seu microclima." 
      />
    </div>
  );
};

export default AgroCoberturaInstruction2;