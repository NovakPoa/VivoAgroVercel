import React from 'react';
import Card from '../UIs/Card/Card';

const IntroCard = ({ isVisible, onButtonClick }) => {
  if (!isVisible) return null;

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
      />
    </div>
  );
};

export default IntroCard;