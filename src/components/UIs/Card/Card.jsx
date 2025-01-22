import React from 'react';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import './Card.css';

const Card = ({ title, description, showImage = true, imageUrl, firstButton = true, secondButton = true, firstButtonText, secondButtonText, firstButtonOnClick, secondButtonOnClick }) => {
  return (
    <div className="card">
      {showImage && (
        <div 
          className="card-image-wrapper" 
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      )}
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        {(firstButton || secondButton) && (
          <div className="card-buttons">
            {firstButton && (
              <PrimaryButton text={firstButtonText} onClick={firstButtonOnClick} />
            )}
            {secondButton && (
              <SecondaryButton text={secondButtonText} onClick={secondButtonOnClick} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
