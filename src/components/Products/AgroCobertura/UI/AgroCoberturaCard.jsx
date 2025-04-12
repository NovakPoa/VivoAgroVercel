import React from 'react';
import Card from '../../../Commons/UI/Card/Card';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';

const AgroCoberturaCard = ({ isVisible, onContinueClick, onSkipClick }) => {
  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  const imageUrl = "/ui/agroCobertura.png";

  return (
    <div className="card-container">
      <Card 
        title="Contratando Agro Cobertura Móvel" 
        description="Conectividade é o primeiro passo para sua fazenda tecnológica, saiba mais sobre nossa solução:" 
        showImage={true}
        imageUrl={imageUrl}
        firstButton={true}
        firstButtonText="Contratar"
        firstButtonOnClick={onContinueClick}
        secondButton={true}
        secondButtonText="Já possuo conectividade"
        secondButtonOnClick={onSkipClick}   
        isVisible={isVisible}  
        onAnimationOutEnded={handleAnimationOutEnded}    
      />
    </div>
  );
};

export default AgroCoberturaCard;