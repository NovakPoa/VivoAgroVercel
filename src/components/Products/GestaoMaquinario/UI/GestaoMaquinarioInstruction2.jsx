import React from 'react';
import InstructionWithTimer from '../../../Commons/UI/InstructionWithTimer/InstructionWithTimer';

const GestaoMaquinarioInstruction2 = ({ isVisible }) => {
  return (
    <InstructionWithTimer
      isVisible={isVisible}
      title="Estamos conectando seus sensores"
      description="Você logo poderá acessar os dados da sua frota."
      duration={4}
    />
  );
};

export default GestaoMaquinarioInstruction2;