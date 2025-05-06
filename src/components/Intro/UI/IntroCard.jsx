import React, { useEffect, useState, useCallback } from 'react';
import Card from '../../Commons/UI/Card/Card';
import useComponentVisibility from '../../../hooks/useComponentVisibility';

const IntroCard = ({ isVisible, onButtonClick }) => {
  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  return (
    <div className="card-container">
      <Card
        title="Bem-vindo à experiência Vivo Agro"
        description="Descubra como as nossas soluções de tecnologia podem ajudar na sua fazenda."
        showImage={false}
        firstButton={true}
        firstButtonText="Começar"
        firstButtonOnClick={onButtonClick}
        secondButton={false}
        isVisible={isVisible}
        onAnimationOutEnded={handleAnimationOutEnded}
        position="bottom"
        purpleTitle={true}
      />
    </div>
  );
};

export default IntroCard;