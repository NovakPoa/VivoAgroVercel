import React from 'react';
import Card from '../../../Commons/UI/Card/Card';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';

const GestaoPecuariaCard = ({ isVisible, onContinueClick, onSkipClick }) => {
  const shouldRender = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  const imageUrl = "/ui/gestaoPecuaria.png";

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
        isVisible={isVisible}        
      />
    </div>
  );
};

export default GestaoPecuariaCard;