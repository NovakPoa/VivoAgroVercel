import React from 'react';
import Card from '../UIs/Card/Card';

const GestaoFazendaCard = ({ isVisible, onContinueClick, onSkipClick }) => {
  if (!isVisible) return null;

  return (
    <div className="card-container">
      <Card 
        title="Contratando Gestão de Fazenda" 
        description="Obtenha controle completo das atividades financeiras e operacionais da sua propriedade." 
        showImage={true}
        imageUrl="/textures/gestaoFazenda.jpg"
        fistButtonText="Contratar"
        fistButtonOnClick={onContinueClick}
        secondButton={true}
        secondButtonText="Já possuo um sistema de gestão"
        secondButtonOnClick={onSkipClick}        
      />
    </div>
  );
};

export default GestaoFazendaCard;