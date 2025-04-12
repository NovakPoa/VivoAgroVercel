import React from 'react';
import Card from '../../Commons/UI/Card/Card';
import useComponentVisibility from '../../../hooks/useComponentVisibility';

const IntroCard = ({ isVisible, onButtonClick }) => {
  const shouldRender = useComponentVisibility(isVisible);

  if (!shouldRender) return null;

  return (
    <div className="card-container">
      <Card 
        title="Bem-vindo à Imersão Vivo Agro" 
        description="Embarque nessa experiência para descobrir o que a tecnologia pode fazer pela sua fazenda." 
        showImage={false}
        firstButton={true}
        firstButtonText="Começar"
        firstButtonOnClick={onButtonClick}
        secondButton={false}
        isVisible={isVisible}  
      />
    </div>
  );
};

export default IntroCard;