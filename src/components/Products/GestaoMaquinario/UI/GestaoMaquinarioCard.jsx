import React from 'react';
import Card from '../../../Commons/UI/Card/Card';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';

const GestaoMaquinarioCard = ({ isVisible, onContinueClick, onSkipClick }) => {
  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  const imageUrl = "/ui/gestaoMaquinario.jpg";

  return (
    <div className="card-container">
      <Card 
        title="Gestão de Maquinário" 
        description="Acompanhe a performance da sua frota em tempo real em uma única plataforma." 
        showImage={true}
        imageUrl={imageUrl}
        firstButton={true}
        firstButtonText="Saiba mais"
        firstButtonOnClick={onContinueClick}
        secondButton={true}
        secondButtonText="Não possuo maquinário"
        secondButtonOnClick={onSkipClick} 
        isVisible={isVisible}  
        onAnimationOutEnded={handleAnimationOutEnded}        
      />
    </div>
  );
};

export default GestaoMaquinarioCard;