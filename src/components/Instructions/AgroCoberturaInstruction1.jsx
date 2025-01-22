import React from 'react';
import Card from '../UIs/Card/Card';

const AgroCoberturaInstruction1 = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="instruction-container">
      <Card 
        title="Leve cobertura aonde você mais precisa" 
        description="Arraste a torre abaixo para escolher onde instalar sua primeira antena do Agro Cobertura Móvel." 
        showImage={false}
        firstButton={false}
        secondButton={false}
      />
    </div>
  );
};

export default AgroCoberturaInstruction1;