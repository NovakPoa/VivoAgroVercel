import React, { useEffect, useState } from 'react';
import IntroCard from './UI/IntroCard';
import useIntroStore from '../../stores/IntroStore';
import useProductsStore from '../../stores/ProductsStore';

const Intro = () => {
  const startProductsDelay = 2000;
  const showIntroCardDelay = 0;

  const [showCard, setShowCard] = useState(false);
  const { setIntroObjectAnimate, setIntroObjectVisible } = useIntroStore();
  const { setCurrentProduct, setStartProduct } = useProductsStore();

  const onButtonClick = () => {
    setIntroObjectVisible(true);
    setIntroObjectAnimate(true);
    setShowCard(false);
    startProductsTimer();
  }

  const startProductsTimer = () => {
    setTimeout(() => {
      setCurrentProduct('agro-cobertura');
      setStartProduct(true);
    }, startProductsDelay);
  }

  useEffect(() => {
    setTimeout(() => {
      setShowCard(true);
    }, showIntroCardDelay);  
  } , []);

  return (
    <div className="intro-container">
      <IntroCard isVisible={showCard} onButtonClick={onButtonClick} />
    </div>
  );
};

export default Intro;