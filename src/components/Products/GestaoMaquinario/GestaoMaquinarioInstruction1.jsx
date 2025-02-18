import React from 'react';
import Instruction from '../../../UIs/Instruction/Instruction';

const AgroCoberturaInstruction1 = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="instruction-container">
      <Instruction 
        title="Acople o sensor inteligente" 
        description="Arraste o sensor abaixo para escolher onde integrar o sensor para Gestão de Maquinário." 
      />
    </div>
  );
};

export default AgroCoberturaInstruction1;