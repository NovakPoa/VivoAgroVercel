import React, { useContext, useEffect } from 'react';
import IntroCard from '../Intro/IntroCard';
import { SceneContext } from '../../context/SceneContext';

const Intro = () => {
  const startIntroDelay = 1000;
  const showIntroCardDelay = 1000;

  const { showIntroCard, setShowIntroCard, setStartAgroCobertura } = useContext(SceneContext);

  const startAnimation = () => {
    console.log("Animation started");
    ///
  }

  const onButtonClick = () => {
    console.log("Button Clicked");
    setShowIntroCard(false);
    setStartAgroCobertura(true);
  }

  const startIntroTimer = () => {
    setTimeout(() => {
      startAnimation();
      setTimeout(() => {
        setShowIntroCard(true);
      }, showIntroCardDelay);      
    }, startIntroDelay);
  }

  useEffect(() => {
    startIntroTimer();
  } , []);

  return (
    <div className="intro-container">
      <IntroCard isVisible={showIntroCard} onButtonClick={onButtonClick} />
    </div>
  );
};

export default Intro;