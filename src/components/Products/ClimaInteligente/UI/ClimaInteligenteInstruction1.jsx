import React from 'react';
import Instruction from '../../../Commons/UI/Instruction/Instruction';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';

const ClimaInteligenteInstruction1 = ({ isVisible }) => {
  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  return (
    <div className="instruction-container">
      <Instruction
        title="Instale a estação meteorológica"
        description="Clique em um dos botões abaixo e obtenha acesso aos dados climáticos."
        isVisible={isVisible}
        onAnimationOutEnded={handleAnimationOutEnded}
      />
    </div>
  );
};

export default ClimaInteligenteInstruction1;