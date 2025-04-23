import React from 'react';
import Card from '../../Commons/UI/Card/Card';
import useComponentVisibility from '../../../hooks/useComponentVisibility';

const ResetConfirmation = ({ isVisible, onConfirmButtonClick, onCancelButtonClick }) => {
  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  return (
    <div className="card-container">
      <Card 
        title="Reiniciar a experiência?" 
        description="Tem certeza que deseja reiniciar a experiência? Todo progresso será perdido." 
        showImage={false}
        firstButton={true}
        firstButtonShowIcon={false}
        firstButtonText="Reiniciar"
        firstButtonOnClick={onConfirmButtonClick}
        secondButton={true}
        secondButtonText="Voltar"
        secondButtonOnClick={onCancelButtonClick}        
        isVisible={isVisible} 
        onAnimationOutEnded={handleAnimationOutEnded}  
      />
    </div>
  );
};

export default ResetConfirmation;