import React, { useContext, useEffect, useState } from 'react';
import IntroCard from '../Intro/IntroCard';
import { SceneContext } from '../../context/SceneContext';

const Intro = () => {
  const startIntroDelay = 4000;
  const showIntroCardDelay = 4000;

  const [showCard, setShowCard] = useState(false);
  const { setIntroObjectAnimate, setStartAgroCobertura, setIntroObjectVisible } = useContext(SceneContext);

  const startAnimation = () => {
    setIntroObjectAnimate(true);
  }

  const onButtonClick = () => {
    setShowCard(false);
    setStartAgroCobertura(true);
    setIntroObjectVisible(false);
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