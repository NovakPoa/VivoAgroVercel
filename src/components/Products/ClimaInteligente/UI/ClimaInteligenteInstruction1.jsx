import React from 'react';
import Instruction from '../../../Commons/UI/Instruction/Instruction';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';

const ClimaInteligenteInstruction1 = ({ isVisible }) => {
  const shouldRender = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  return (
    <div className="instruction-container">
      <Instruction 
        title="Instale a estação meteorológica" 
        description="Arraste a estação abaixo para escolher onde instalar sua estação do Clima Inteligente." 
        isVisible={isVisible}
      />
    </div>
  );
};

export default ClimaInteligenteInstruction1;