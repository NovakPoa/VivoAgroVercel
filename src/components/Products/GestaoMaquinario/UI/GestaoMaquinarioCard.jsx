import React from 'react';
import Card from '../../../Commons/UI/Card/Card';
import useCardVisibility from '../../../../hooks/useCardVisibility';

const GestaoMaquinarioCard = ({ isVisible, onContinueClick, onSkipClick }) => {
  const shouldRender = useCardVisibility(isVisible);

  if (!shouldRender) return null;

  const imageUrl = "/ui/gestaoMaquinario.jpg";

  return (
    <div className="card-container">
      <Card 
        title="Contratando Gestão de Maquinário" 
        description="Monitore e controle toda sua frota em tempo real, aumentando a produtividade e reduzindo custos." 
        showImage={true}
        imageUrl={imageUrl}
        firstButton={true}
        firstButtonText="Contratar"
        firstButtonOnClick={onContinueClick}
        secondButton={true}
        secondButtonText="Não possuo maquinário"
        secondButtonOnClick={onSkipClick} 
        isVisible={isVisible}          
      />
    </div>
  );
};

export default GestaoMaquinarioCard;