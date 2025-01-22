import React from 'react';
import Card from '../../UIs/Card/Card';

const AgroCoberturaCard = ({ isVisible, onContinueClick, onSkipClick }) => {
  if (!isVisible) return null;

  return (
    <div className="card-container">
      <Card 
        title="Contratando Agro Cobertura Móvel" 
        description="Conectividade é o primeiro passo para sua fazenda tecnológica, saiba mais sobre nossa solução:" 
        showImage={true}
        imageUrl="/textures/agroCobertura.png"
        fistButtonText="Contratar"
        fistButtonOnClick={onContinueClick}
        secondButton={true}
        secondButtonText="Já possuo conectividade"
        secondButtonOnClick={onSkipClick}        
      />
    </div>
  );
};

export default AgroCoberturaCard;