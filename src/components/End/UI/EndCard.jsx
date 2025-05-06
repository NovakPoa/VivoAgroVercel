import React from 'react';
import Card from '../../Commons/UI/Card/Card';
import useComponentVisibility from '../../../hooks/useComponentVisibility';

const EndCard = ({ isVisible, onContinueClick, onSkipClick }) => {
  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  return (
    <div className="card-container">
      <Card
        title={`Você concluiu a experiência
          Vivo Agro`}
        description="Entre em contato com nossa equipe de vendas para descobrir quais são as melhores soluções para o seu agronegócio."
        showImage={false}
        imageUrl="#"
        firstButton={true}
        firstButtonText="Recomeçar experiência"
        firstButtonOnClick={onContinueClick}
        secondButton={false}
        isVisible={isVisible}
        onAnimationOutEnded={handleAnimationOutEnded}
        purpleTitle={true}
        showCheckIcon={true}
      />
    </div>
  );
};

export default EndCard;