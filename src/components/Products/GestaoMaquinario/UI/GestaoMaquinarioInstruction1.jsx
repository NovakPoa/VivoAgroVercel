import React from 'react';
import Instruction from '../../../Commons/UI/Instruction/Instruction';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';

const GestaoMaquinarioInstruction1 = ({ isVisible }) => {
  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  return (
    <div className="instruction-container">
      <Instruction
        title="Instale o dispositivo para conectar sua frota"
        description="Clique nos botões abaixo para instalar em um dos tratores."
        isVisible={isVisible}
        onAnimationOutEnded={handleAnimationOutEnded}
      />
    </div>
  );
};

export default GestaoMaquinarioInstruction1;