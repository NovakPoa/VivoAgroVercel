import React, { useContext, useEffect, useState } from 'react';
import IntroCard from './UI/IntroCard';
import useIntroStore from '../../stores/IntroStore';
import useProductsStore from '../../stores/ProductsStore';

const Intro = () => {
  const startIntroDelay = 1000;
  const showIntroCardDelay = 1000;

  const [showCard, setShowCard] = useState(false);
  const { setIntroObjectAnimate, setIntroObjectVisible } = useIntroStore();
  const { setCurrentProduct, setStartProduct } = useProductsStore();

  const startAnimation = () => {
    setIntroObjectAnimate(true);
  }

  const onButtonClick = () => {
    setShowCard(false);
    setCurrentProduct('agro-cobertura');
    setStartProduct(true);
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