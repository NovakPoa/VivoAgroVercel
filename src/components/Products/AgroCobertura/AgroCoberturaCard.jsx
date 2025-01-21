import React from 'react';

const AgroCoberturaCard = ({ isVisible, onContinueClick, onSkipClick }) => {
  if (!isVisible) return null;

  return (
    <div className="card">
      <div className="card-content">
        <h2>AgroCobertura</h2>
        <p>Aqui AgroCobertura.</p>
        <button className="card-button" onClick={onContinueClick}>Start</button>
        <button className="card-button" onClick={onSkipClick}>Skip</button>
      </div>
    </div>
  );
};

export default AgroCoberturaCard;