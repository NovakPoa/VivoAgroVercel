import React from 'react';
import Card from '../../../Commons/UI/Card/Card';
import useCardVisibility from '../../../../hooks/useCardVisibility';

const ClimaInteligenteCard = ({ isVisible, onContinueClick, onSkipClick }) => {
  const shouldRender = useCardVisibility(isVisible);

  if (!shouldRender) return null;

  const imageUrl = "/ui/climaInteligente.jpg";

  return (
    <div className="card-container">
      <Card 
        title="Contratando Clima Inteligente" 
        description="Previsões precisas sobre seu microclima, ajudando você a otimizar seu manejo, irrigação e produção." 
        showImage={true}
        imageUrl={imageUrl}
        firstButton={true}
        firstButtonText="Contratar"
        firstButtonOnClick={onContinueClick}
        secondButton={true}
        secondButtonText="Já possuo análise de microclima"
        secondButtonOnClick={onSkipClick}
        isVisible={isVisible}     
      />
    </div>
  );
};

export default ClimaInteligenteCard;