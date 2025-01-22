import React from 'react';
import PrimaryButton from '../UIs/PrimaryButton/PrimaryButton';
import SecondaryButton from '../UIs/SecondaryButton/SecondaryButton';

const Intro = ({ isVisible, onButtonClick }) => {
  if (!isVisible) return null;

  return (
    <div className="card">
      <div className="card-content">
        <h2>Intro</h2>
        <p>Aqui Intro Card.</p>
        <PrimaryButton text="Começar" onClick={onButtonClick} />
      </div>
    </div>
  );
};

export default Intro;