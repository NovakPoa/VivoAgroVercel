import React from 'react';
import Card from '../../../Commons/UI/Card/Card';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';

const ClimaInteligenteCard = ({ isVisible, onContinueClick, onSkipClick }) => {
  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  const imageUrl = "/ui/climaInteligente.jpg";

  return (
    <div className="card-container">
      <Card 
        title="Clima Inteligente" 
        description="Receba previsões climáticas precisas e otimize seu manejo, irrigação e produção." 
        showImage={true}
        imageUrl={imageUrl}
        firstButton={true}
        firstButtonText="Saiba mais"
        firstButtonOnClick={onContinueClick}
        secondButton={true}
        secondButtonText="Já possuo análise de microclima"
        secondButtonOnClick={onSkipClick}
        isVisible={isVisible}  
        onAnimationOutEnded={handleAnimationOutEnded}   
      />
    </div>
  );
};

export default ClimaInteligenteCard;