import React from 'react';
import InstructionWithTimer from '../../../Commons/UI/InstructionWithTimer/InstructionWithTimer';

const AgroCoberturaInstruction2 = ({ isVisible }) => {
  return (
    <InstructionWithTimer 
      isVisible={isVisible}
      title="Ative o sinal da antena" 
      description="Pressione o botão para ativar o sinal de sua antena."
      duration={4}
    />
  );
};

export default AgroCoberturaInstruction2;