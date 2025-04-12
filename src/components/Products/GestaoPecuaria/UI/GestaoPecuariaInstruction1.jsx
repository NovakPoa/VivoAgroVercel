import React from 'react';
import Instruction from '../../../Commons/UI/Instruction/Instruction';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';

const GestaoPecuariaInstruction1 = ({ isVisible }) => {
  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  return (
    <div className="instruction-container">
      <Instruction 
        title="Aplique o dispositivo no gado" 
        description="Arraste o dispositivo abaixo para começar a receber os dados da Gestão Pecuária." 
        isVisible={isVisible}   
        onAnimationOutEnded={handleAnimationOutEnded}     
      />
    </div>
  );
};

export default GestaoPecuariaInstruction1;