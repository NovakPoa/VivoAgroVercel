import React from 'react';
import Instruction from '../../../Commons/UI/Instruction/Instruction';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';

const AgroCoberturaInstruction1 = ({ isVisible }) => {
  const shouldRender = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  return (
    <div className="instruction-container">
      <Instruction 
        title="Leve cobertura aonde você mais precisa" 
        description="Arraste a torre abaixo para escolher onde instalar sua primeira antena do Agro Cobertura Móvel." 
        isVisible={isVisible}
      />
    </div>
  );
};

export default AgroCoberturaInstruction1;