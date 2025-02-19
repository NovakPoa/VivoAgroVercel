import React from 'react';
import './PrimaryButton.css';

const PrimaryButton = ({ text, onClick, showIcon = true }) => {
  return (
    <button className="primary-button" onClick={onClick}>
      {showIcon && <img src="./textures/vivo-icon.png" alt="Vivo Icon" className="button-icon" />}
      <span className="button-text">{text}</span>
    </button>
  );
};

export default PrimaryButton;