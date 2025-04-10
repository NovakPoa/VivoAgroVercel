import React from 'react';
import InstructionWithTimer from '../../../Commons/UI/InstructionWithTimer/InstructionWithTimer';

const GestaoMaquinarioInstruction2 = ({ isVisible }) => {
  return (
    <InstructionWithTimer 
      isVisible={isVisible}
      title="Ligue o sensor inteligente"
      description="Pressione o botão para conectar o sensor do seu maquinário e desbloquear os dados de uso."
      duration={4}
    />
  );
};

export default GestaoMaquinarioInstruction2;