import React, { memo, useState, useCallback } from 'react';
import './Button.css';

let isAnyButtonClicked = false;

const Button = ({ text, onClick, showIcon = true, iconUrl = "./ui/icons/vivo-icon.png", type = 'primary' }) => {
  const buttonClass = type === 'primary' ? 'primary-button' : 'secondary-button';

  const handleClick = useCallback((e) => {
    if (isAnyButtonClicked) return;
    isAnyButtonClicked = true;
    onClick && onClick(e);
    // Reativa o botão após um período
    setTimeout(() => {
      isAnyButtonClicked = false;
    }, 600);
  }, [onClick]);

  return (
    <button 
      className={`${buttonClass} ${isAnyButtonClicked ? 'button-disabled' : ''}`} 
      onClick={handleClick}
    >
      {showIcon && <img src={iconUrl} alt="Icon" className="button-icon" />}
      <span className="button-text">{text}</span>
    </button>
  );
};

export default memo(Button);