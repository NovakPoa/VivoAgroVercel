import React from 'react';
import Card from '../../../Commons/UI/Card/Card';
import useCardVisibility from '../../../../hooks/useCardVisibility';

const AgroCoberturaCard = ({ isVisible, onContinueClick, onSkipClick }) => {
  const shouldRender = useCardVisibility(isVisible);

  if (!shouldRender) return null;

  const imageUrl = "/ui/agroCobertura.png";

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
        isVisible={isVisible}      
      />
    </div>
  );
};

export default AgroCoberturaCard;