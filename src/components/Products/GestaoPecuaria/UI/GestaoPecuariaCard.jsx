import React from 'react';
import Card from '../../../Commons/UI/Card/Card';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';

const GestaoPecuariaCard = ({ isVisible, onContinueClick, onSkipClick }) => {
  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  const imageUrl = "/ui/gestaoPecuaria.jpg";

  return (
    <div className="card-container">
      <Card
        title="Gestão Pecuária"
        description="Monitore seu rebanho remotamente e digitalize as principais atividades do manejo."
        showImage={true}
        imageUrl={imageUrl}
        firstButton={true}
        firstButtonText="Saiba mais"
        firstButtonOnClick={onContinueClick}
        secondButton={true}
        secondButtonText="Não possuo gado"
        secondButtonOnClick={onSkipClick}
        isVisible={isVisible}
        onAnimationOutEnded={handleAnimationOutEnded}
      />
    </div>
  );
};

export default GestaoPecuariaCard;