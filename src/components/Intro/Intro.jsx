import React, { useEffect, useState, useCallback } from 'react';
import IntroCard from './UI/IntroCard';
import useIntroStore from '../../stores/IntroStore';
import useProductsStore from '../../stores/ProductsStore';

const START_PRODUCTS_DELAY = 2000;
const SHOW_INTRO_CARD_DELAY = 0;

const Intro = () => {
  const [showCard, setShowCard] = useState(false);
  const { setStartIntro, setIntroVisibility } = useIntroStore();
  const { setCurrentProduct, setStartProduct } = useProductsStore();

  const timerToStartProduct = () => {
    setTimeout(() => {
      setCurrentProduct('agro-cobertura');
      setStartProduct(true);
    }, START_PRODUCTS_DELAY);
  }

  useEffect(() => {
    setTimeout(() => {
      setShowCard(true);
    }, SHOW_INTRO_CARD_DELAY);  
  } , []);

  const onButtonClick = useCallback(() => {
    setIntroVisibility(true);
    setStartIntro(true);
    setShowCard(false);
    timerToStartProduct();   
  }, []);

  return (
    <div className="intro-container">
      <IntroCard isVisible={showCard} onButtonClick={onButtonClick} />
    </div>
  );
};

export default Intro;