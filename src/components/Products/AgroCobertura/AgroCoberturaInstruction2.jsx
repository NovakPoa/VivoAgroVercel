import React from 'react';
import Instruction from '../../../Commons/UI/Instruction/Instruction';

const AgroCoberturaInstruction2 = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="instruction-container">
      <Instruction 
        title="Ative o sinal da antena" 
        description="Pressione o botão para ativar o sinal de sua antena e desbloquear novas tecnologias para sua fazenda." 
      />
    </div>
  );
};

export default AgroCoberturaInstruction2;