import React from 'react';
import Instruction from '../UIs/Instruction/Instruction';

const AgroCoberturaInstruction2 = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="instruction-container">
      <Instruction 
        title="Ligue o sensor inteligente" 
        description="Pressione o botão para conectar o sensor do seu maquinário e desbloquear os dados de uso." 
      />
    </div>
  );
};

export default AgroCoberturaInstruction2;