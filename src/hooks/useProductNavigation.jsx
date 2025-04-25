import { useState, useEffect, useCallback, useRef } from 'react';
import useProductsStore from '../stores/ProductsStore';
import useInteractionStore from '../stores/InteractionStore';
import useCameraStore from '../stores/CameraStore';
import useDashboardStore from '../stores/DashboardStore';
import useEndStore from '../stores/EndStore';
import { ANIMATION_DURATIONS } from '../config/animationUIConfig';

export default function useProductNavigation() {
  const [showCard, setShowCard] = useState(false);
  const { 
    startProduct, 
    currentProduct, 
    setStartProduct, 
    setLastProductName,
    lastProductName
  } = useProductsStore();
  const { setShowInteraction } = useInteractionStore();
  const { setShowDashboard } = useDashboardStore();
  const { animateToProduct } = useCameraStore();
  const { setShowEndCard } = useEndStore();

  const timerRef = useRef(null);

  const endProduct = useCallback(() => {
    useProductsStore.getState().completeProduct(currentProduct);
    setLastProductName(currentProduct);
    setShowInteraction(false);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (currentProduct === 'clima-inteligente') {
        setShowEndCard(true);
      } else 
      {
        setShowDashboard(true);
        timerRef.current = null;
      }
    }, ANIMATION_DURATIONS.CARD.SCALE_OUT);
     
  }, [ currentProduct ]);

  const startProductHandler = useCallback(() => {
    if (currentProduct === lastProductName) {
      setShowCard(true);
      return;
    }

    const showCardOffset = -500;
    const duration = 2;
    const delay = duration * 1000 + showCardOffset;
    
    animateToProduct(currentProduct, duration);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowCard(true);
      timerRef.current = null;
    }, delay);
  }, [currentProduct, lastProductName]);

  useEffect(() => {
    if (startProduct) {
      startProductHandler();
      setStartProduct(false);
    }
  }, [startProduct]);

  const onContinueClick = useCallback(() => {
    setShowCard(false);
    
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowInteraction(true);
      timerRef.current = null;
    }, ANIMATION_DURATIONS.CARD.SCALE_OUT);
  }, [setShowInteraction]);

  const onSkipClick = useCallback(() => {
    setShowCard(false);
    endProduct();   
  }, [endProduct]);

  return {
    showCard,
    endProduct,
    onContinueClick,
    onSkipClick
  };
}