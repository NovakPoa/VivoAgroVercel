import React from 'react';
import Instruction from '../../../Commons/UI/Instruction/Instruction';

const AgroCoberturaInstruction2 = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="instruction-container">
      <Instruction 
        title="Integre todas as tecnologias" 
        description="Pressione o botão para ativar o Gestão de Fazenda e integrar todas as tecnologias da sua fazenda." 
      />
    </div>
  );
};

export default AgroCoberturaInstruction2;