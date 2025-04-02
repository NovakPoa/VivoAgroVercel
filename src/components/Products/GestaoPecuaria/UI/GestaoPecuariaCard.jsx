import React from 'react';
import Card from '../../../Commons/UI/Card/Card';

const GestaoPecuariaCard = ({ isVisible, onContinueClick, onSkipClick }) => {

  const imageUrl = "/ui/gestaoPecuaria.png";

  if (!isVisible) return null;

  return (
    <div className="card-container">
      <Card 
        title="Contratando Gestão Pecuária" 
        description="Analise a performance individual dos animais e maximize a produtividade do seu rebanho." 
        showImage={true}
        imageUrl={imageUrl}
        firstButton={true}
        firstButtonText="Contratar"
        firstButtonOnClick={onContinueClick}
        secondButton={true}
        secondButtonText="Não possuo gado"
        secondButtonOnClick={onSkipClick}        
      />
    </div>
  );
};

export default GestaoPecuariaCard;