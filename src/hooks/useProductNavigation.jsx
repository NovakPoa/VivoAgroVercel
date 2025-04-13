import { useState, useEffect, useCallback, useRef } from 'react';
import useProductsStore from '../stores/ProductsStore';
import useInteractionStore from '../stores/InteractionStore';
import useCameraStore from '../stores/CameraStore';
import useDashboardStore from '../stores/DashboardStore';
import { ANIMATION_DURATIONS } from '../config/animationConfig';

export default function useProductNavigation() {
  const [showCard, setShowCard] = useState(false);
  const { 
    startProduct, 
    currentProduct, 
    setStartProduct, 
    setProductStatus,
    setLastProductName,
    productsOrder,
    productsStatus,
    lastProductName
  } = useProductsStore();
  const { setShowInteraction } = useInteractionStore();
  const { setShowDashboard } = useDashboardStore();
  const { animateToProduct } = useCameraStore();

  const timerRef = useRef(null);

  const endProduct = useCallback(() => {
    setProductStatus(currentProduct, 'completed');
    setLastProductName(currentProduct);
    setShowInteraction(false);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowDashboard(true);
      timerRef.current = null;
    }, ANIMATION_DURATIONS.CARD.SCALE_OUT); 

    // Desbloquear próximo produto
    const currentIndex = productsOrder.indexOf(currentProduct);
    if (currentIndex !== -1 && currentIndex < productsOrder.length - 1) {
      const nextProduct = productsOrder[currentIndex + 1];
      if (productsStatus[nextProduct] === 'locked') {
        setProductStatus(nextProduct, 'unlocked');
      }
    }
  }, [ currentProduct, productsOrder, productsStatus ]);

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