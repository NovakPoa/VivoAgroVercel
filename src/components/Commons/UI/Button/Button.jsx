import React, { memo, useCallback } from 'react';
import useButtonStore from '../../../../stores/ButtonStore';
import useSoundStore from '../../../../stores/SoundStore';
import './Button.css';

const Button = ({ text, onClick, showIcon = true, iconUrl = "./ui/icons/vivo-icon.png", type = 'primary' }) => {
  const buttonClass = type === 'primary' ? 'primary-button' : 'secondary-button';
  const { isAnyButtonClicked, clickButton } = useButtonStore();
  const { playSound } = useSoundStore();

  const handleClick = useCallback((e) => {
    if (isAnyButtonClicked) return;
    clickButton();

    playSound('BUTTON_CLICK', { volume: 0.5 });

    onClick && onClick(e);
  }, [onClick, isAnyButtonClicked, clickButton, playSound]);

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