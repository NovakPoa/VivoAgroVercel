import React from 'react';
import InstructionWithTimer from '../../../Commons/UI/InstructionWithTimer/InstructionWithTimer';

const ClimaInteligenteInstruction2 = ({ isVisible }) => {
  return (
    <InstructionWithTimer 
      isVisible={isVisible}
      title="Ative sua estação meteorológica" 
      description="Pressione o botão para ativar sua estação e começar a receber dados do seu microclima." 
      duration={4}
    />
  );
};

export default ClimaInteligenteInstruction2;