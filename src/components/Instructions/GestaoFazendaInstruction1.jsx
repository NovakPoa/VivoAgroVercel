import React from 'react';
import Instruction from '../UIs/Instruction/Instruction';

const AgroCoberturaInstruction1 = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="instruction-container">
      <Instruction 
        title="Instale o sistema" 
        description="Arraste a esfera abaixo para instalar o sistema Gestão da Fazenda e integrar todas suas soluções." 
      />
    </div>
  );
};

export default AgroCoberturaInstruction1;