import React from 'react';
import InstructionWithTimer from '../../../Commons/UI/InstructionWithTimer/InstructionWithTimer';

const AgroCoberturaInstruction2 = ({ isVisible }) => {
  return (
    <InstructionWithTimer
      isVisible={isVisible}
      title="Estamos ativando sua antena"
      description="Você logo poderá acessar novas tecnologias para sua fazenda."
      duration={4}
    />
  );
};

export default AgroCoberturaInstruction2;