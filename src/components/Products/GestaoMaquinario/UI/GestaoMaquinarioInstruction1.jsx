import React from 'react';
import Instruction from '../../../Commons/UI/Instruction/Instruction';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';

const GestaoMaquinarioInstruction1 = ({ isVisible }) => {
  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  return (
    <div className="instruction-container">
      <Instruction 
        title="Acople o sensor inteligente" 
        description="Arraste o sensor abaixo para escolher onde integrar o sensor para Gestão de Maquinário." 
        isVisible={isVisible}  
        onAnimationOutEnded={handleAnimationOutEnded}      
      />
    </div>
  );
};

export default GestaoMaquinarioInstruction1;