import React from 'react';
import './Button.css';

const Button = ({ text, onClick, showIcon = true, type = 'primary' }) => {
  const buttonClass = type === 'primary' ? 'primary-button' : 'secondary-button';

  return (
    <button className={buttonClass} onClick={onClick}>
      {showIcon && <img src="./textures/vivo-icon.png" alt="Vivo Icon" className="button-icon" />}
      <span className="button-text">{text}</span>
    </button>
  );
};

export default Button;