import React from 'react';
import Card from '../../UIs/Card/Card';

const ClimaInteligenteCard = ({ isVisible, onContinueClick, onSkipClick }) => {
  if (!isVisible) return null;

  return (
    <div className="card-container">
      <Card 
        title="Contratando Clima Inteligente" 
        description="Previsões precisas sobre seu microclima, ajudando você a otimizar seu manejo, irrigação e produção." 
        showImage={true}
        imageUrl="/textures/climaInteligente.jpg"
        fistButtonText="Contratar"
        fistButtonOnClick={onContinueClick}
        secondButton={true}
        secondButtonText="Já possuo análise de microclima"
        secondButtonOnClick={onSkipClick}        
      />
    </div>
  );
};

export default ClimaInteligenteCard;