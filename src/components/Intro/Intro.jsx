import React, { useContext, useEffect, useState } from 'react';
import IntroCard from '../Intro/IntroCard';
import { SceneContext } from '../../context/SceneContext';

const Intro = () => {
  const startIntroDelay = 1000;
  const showIntroCardDelay = 1000;

  const [showCard, setShowCard] = useState(false);
  const { setStartAgroCobertura } = useContext(SceneContext);

  const startAnimation = () => {
    console.log("Animation started");
    ///
  }

  const onButtonClick = () => {
    setShowCard(false);
    setStartAgroCobertura(true);
  }

  const startIntroTimer = () => {
    setTimeout(() => {
      startAnimation();
      setTimeout(() => {
        setShowCard(true);
      }, showIntroCardDelay);      
    }, startIntroDelay);
  }

  useEffect(() => {
    startIntroTimer();
  } , []);

  return (
    <div className="intro-container">
      <IntroCard isVisible={showCard} onButtonClick={onButtonClick} />
    </div>
  );
};

export default Intro;