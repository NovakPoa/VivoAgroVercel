import React from 'react';
import InstructionWithTimer from '../../../Commons/UI/InstructionWithTimer/InstructionWithTimer';

const GestaoPecuariaInstruction2 = ({ isVisible }) => {
  return (
    <InstructionWithTimer
      isVisible={isVisible}
      title="Estamos ativando o monitoramento"
      description="Você logo poderá acompanhar os dados de saúde de seus animais."
      duration={4}
    />
  );
};

export default GestaoPecuariaInstruction2;