import { useState, useEffect } from 'react';
import useProductsStore from '../stores/ProductsStore';
import useInteractionStore from '../stores/InteractionStore';
import useCameraStore from '../stores/CameraStore';
import useDashboardStore from '../stores/DashboardStore';

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

  const endProduct = () => {
    setProductStatus(currentProduct, 'completed');
    setShowCard(false);
    setShowDashboard(true);
    setLastProductName(currentProduct);
    setShowInteraction(false);

    // Desbloquear próximo produto
    const currentIndex = productsOrder.indexOf(currentProduct);
    if (currentIndex !== -1 && currentIndex < productsOrder.length - 1) {
      const nextProduct = productsOrder[currentIndex + 1];
      if (productsStatus[nextProduct] === 'locked') {
        setProductStatus(nextProduct, 'unlocked');
      }
    }
  };

  const startProductHandler = () => {
    if (currentProduct === lastProductName) {
      setShowCard(true);
      return;
    }

    const showCardOffset = -500;
    const duration = 2;
    const delay = duration * 1000 + showCardOffset;
    
    animateToProduct(currentProduct, duration);

    setTimeout(() => {
      setShowCard(true);
    }, delay);
  }

  useEffect(() => {
    if (startProduct) {
      startProductHandler();
      setStartProduct(false);
    }
  }, [startProduct]);

  const onContinueClick = () => {
    setShowCard(false);
    const timer = setTimeout(() => {
      setShowInteraction(true);
    }, 400); // Tempo igual à duração da animação cardScaleOut (ver Card.css)   
  };

  const onSkipClick = () => {
    endProduct();
  };

  return {
    showCard,
    setShowCard,
    endProduct,
    onContinueClick,
    onSkipClick
  };
}