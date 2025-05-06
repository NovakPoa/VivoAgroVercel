import React, { useEffect, useState, useCallback } from 'react';
import IntroCard from './UI/IntroCard';
import useIntroStore from '../../stores/IntroStore';
import useCameraStore from '../../stores/CameraStore';
import useProductsStore from '../../stores/ProductsStore';

const START_PRODUCTS_DELAY = 10000;
const START_NEON_DELAY = 0;
const START_LOGO_DELAY = 4500;

const Intro = () => {
  const [showCard, setShowCard] = useState(false);
  const { setIntroLogoVisibility, setIntroNeonVisibility } = useIntroStore();
  const { setCurrentProduct, setStartProduct } = useProductsStore();
  const { animateToTarget, setFreeLookMode } = useCameraStore();

  useEffect(() => {
    setShowCard(true);
    // setIntroNeonVisibility(true); // NEON DEBUGGING: UNCOMMENT THIS
  }, []);

  const timerToStartProduct = useCallback(() => {
    setTimeout(() => {
      setCurrentProduct('agro-cobertura');
      setStartProduct(true);
    }, START_PRODUCTS_DELAY);
  }, []);

  const timerToStartNeonAnimation = useCallback(() => {
    setTimeout(() => {
      setIntroNeonVisibility(true);
      animateToTarget([4.8, 2.6, -5], 3);
      setTimeout(() => {
        animateToTarget([10, 2.3, 0], 3);
      }, 8000);

    }, START_NEON_DELAY);
  }, []);

  const timerToStartLogoAnimation = useCallback(() => {
    setTimeout(() => {
      setIntroLogoVisibility(true);
    }, START_LOGO_DELAY);
  }, []);

  const onButtonClick = useCallback(() => {
    setShowCard(false);
    setFreeLookMode(false);
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