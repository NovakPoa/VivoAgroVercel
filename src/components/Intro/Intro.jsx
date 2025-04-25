import React, { useEffect, useState, useCallback } from 'react';
import IntroCard from './UI/IntroCard';
import useIntroStore from '../../stores/IntroStore';
import useProductsStore from '../../stores/ProductsStore';

const START_PRODUCTS_DELAY = 6000;
const START_NEON_DELAY = 0;
const START_LOGO_DELAY = 4000;

const Intro = () => {
  const [showCard, setShowCard] = useState(false);
  const { setIntroLogoVisibility, setIntroNeonVisibility } = useIntroStore();
  const { setCurrentProduct, setStartProduct } = useProductsStore();

  useEffect(() => {
    setShowCard(true); 
  } , []);

  const timerToStartProduct = useCallback(() => {
    setTimeout(() => {
      setCurrentProduct('agro-cobertura');
      setStartProduct(true);
    }, START_PRODUCTS_DELAY);
  }, []);

  const timerToStartNeonAnimation = useCallback(() => {
    setTimeout(() => {
      setIntroNeonVisibility(true);
    }, START_NEON_DELAY);
  }, []);

  const timerToStartLogoAnimation = useCallback(() => {
    setTimeout(() => {
      setIntroLogoVisibility(true);
    }, START_LOGO_DELAY);
  }, []);

  const onButtonClick = useCallback(() => {
    setShowCard(false);
    timerToStartLogoAnimation();
    timerToStartNeonAnimation();
    timerToStartProduct();   
  }, []);

  return (
    <div className="intro-container">
      <IntroCard isVisible={showCard} onButtonClick={onButtonClick} />
    </div>
  );
};

export default Intro;