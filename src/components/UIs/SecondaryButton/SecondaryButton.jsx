import React from 'react';
import './SecondaryButton.css';

const SecondaryButton = ({ text, onClick }) => {
  return (
    <button className="secondary-button" onClick={onClick}>
      <span className="button-text">{text}</span>
    </button>
  );
};

export default SecondaryButton;