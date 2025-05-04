import React from 'react';
import InstructionWithTimer from '../../../Commons/UI/InstructionWithTimer/InstructionWithTimer';

const ClimaInteligenteInstruction2 = ({ isVisible }) => {
  return (
    <InstructionWithTimer
      isVisible={isVisible}
      title="Estamos iniciando sua estação meteorológica"
      description="Você logo terá acesso aos dados climáticos da sua fazenda."
      duration={4}
    />
  );
};

export default ClimaInteligenteInstruction2;