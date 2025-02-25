import React from 'react';
import Card from '../../Commons/UI/Card/Card';

const EndCard = ({ isVisible, onContinueClick, onSkipClick }) => {
  if (!isVisible) return null;

  return (
    <div className="card-container">
      <Card 
        title="Você concluiu a Imersão Vivo Agro" 
        description="Entre em contato com nossa equipe de vendas para descobrir quais são as melhores soluções para o seu agronegócio." 
        showImage={false}
        imageUrl="#"
        firstButton={true}
        firstButtonText="Seguir explorando"
        firstButtonOnClick={onContinueClick}
        secondButton={true}
        secondButtonText="Recomeçar experiência"
        secondButtonOnClick={onSkipClick}        
      />
    </div>
  );
};

export default EndCard;