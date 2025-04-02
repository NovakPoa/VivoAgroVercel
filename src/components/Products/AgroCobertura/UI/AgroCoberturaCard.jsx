import React from 'react';
import Card from '../../../Commons/UI/Card/Card';

const AgroCoberturaCard = ({ isVisible, onContinueClick, onSkipClick }) => {

  const imageUrl = "/ui/agroCobertura.png";

  if (!isVisible) return null;
  
  return (
    <div className="card-container">
      <Card 
        title="Contratando Agro Cobertura Móvel" 
        description="Conectividade é o primeiro passo para sua fazenda tecnológica, saiba mais sobre nossa solução:" 
        showImage={true}
        imageUrl={imageUrl}
        firstButton={true}
        firstButtonText="Contratar"
        firstButtonOnClick={onContinueClick}
        secondButton={true}
        secondButtonText="Já possuo conectividade"
        secondButtonOnClick={onSkipClick}        
      />
    </div>
  );
};

export default AgroCoberturaCard;