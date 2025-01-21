import React, { useContext, useEffect, useState } from 'react';
import IntroCard from '../Intro/IntroCard';
import useIntroStore from '../../stores/IntroStore';
import useAgroCoberturaStore from '../../stores/AgroCoberturaStore';

const Intro = () => {
  const startIntroDelay = 4000;
  const showIntroCardDelay = 4000;

  const [showCard, setShowCard] = useState(false);
  const { setIntroObjectAnimate, setIntroObjectVisible } = useIntroStore();
  const { setAgroCoberturaObjectVisible } = useAgroCoberturaStore();

  const startAnimation = () => {
    setIntroObjectAnimate(true);
  }

  const onButtonClick = () => {
    setShowCard(false);
    setAgroCoberturaObjectVisible(true);
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