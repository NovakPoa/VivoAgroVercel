import React from 'react';
import Card from '../../../Commons/UI/Card/Card';

const GestaoMaquinarioCard = ({ isVisible, onContinueClick, onSkipClick }) => {

  const imageUrl = "/ui/gestaoMaquinario.jpg";

  if (!isVisible) return null;

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
      />
    </div>
  );
};

export default GestaoMaquinarioCard;