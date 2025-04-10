import React from 'react';
import InstructionWithTimer from '../../../Commons/UI/InstructionWithTimer/InstructionWithTimer';

const GestaoPecuariaInstruction2 = ({ isVisible }) => {
  return (
    <InstructionWithTimer 
      isVisible={isVisible}
      title="Ative o dispositivo" 
      description="Pressione o botão para conectar o sensor do seu gado e desbloquear os dados de uso." 
      duration={4}
    />
  );
};

export default GestaoPecuariaInstruction2;