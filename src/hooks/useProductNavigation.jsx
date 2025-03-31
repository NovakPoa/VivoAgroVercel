import { useState, useEffect } from 'react';
import useProductsStore from '../stores/ProductsStore';
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
  
  const { setShowDashboard } = useDashboardStore();
  const { setCameraAnimate } = useCameraStore();

  // Define pontos de câmera por produto
  const cameraPositions = {
    'agro-cobertura': [0, 0, 0],
    'gestao-maquinario': [30, 0, -8],
    'gestao-pecuaria': [-30, 0, -16],
    'clima-inteligente': [30, 0, -16],
    'gestao-fazenda': [0, 0, -16]
  };

  const startCameraAnimation = (point, duration = 2) => {
    setCameraAnimate({ animate: true, point, duration });
  };

  const endProduct = () => {
    setProductStatus(currentProduct, 'completed');
    setShowCard(false);
    setShowDashboard(true);
    setLastProductName(currentProduct);

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
    
    // Animar câmera para posição do produto atual
    const targetPosition = cameraPositions[currentProduct];
    if (targetPosition) {
      startCameraAnimation(targetPosition, duration);
    }

    // Mostrar card após animação da câmera
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

  return {
    showCard,
    setShowCard,
    endProduct
  };
}