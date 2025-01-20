import React from 'react';
import './IntroCard.css';

const Intro = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="card">
      <div className="card-content">
        <h2>Intro</h2>
        <p>Aqui Intro Card.</p>
        <button className="card-button">Start</button>
      </div>
    </div>
  );
};

export default Intro;