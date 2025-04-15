import React, { useEffect, useState, useCallback } from 'react';
import IntroCard from './UI/IntroCard';
import useIntroStore from '../../stores/IntroStore';
import useProductsStore from '../../stores/ProductsStore';

const START_PRODUCTS_DELAY = 6000;

const Intro = () => {
  const [showCard, setShowCard] = useState(false);
  const { introVisibility, setStartIntro, setIntroVisibility, setIntroNeonVisibility } = useIntroStore();
  const { setCurrentProduct, setStartProduct } = useProductsStore();

  useEffect(() => {
    if (!introVisibility) {
      setShowCard(true); 
    }
  } , [introVisibility]);

  const timerToStartProduct = useCallback(() => {
    setTimeout(() => {
      setCurrentProduct('agro-cobertura');
      setStartProduct(true);
    }, START_PRODUCTS_DELAY);
  }, []);

  const onButtonClick = useCallback(() => {
    setIntroVisibility(true);
    setIntroNeonVisibility(true);
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