import React, { useEffect, useState } from 'react';
import useProductsStore from '../../stores/ProductsStore';
import useDashboardStore from '../../stores/DashboardStore';
import useCameraStore from '../../stores/CameraStore';
import AgroCoberturaCard from './AgroCoberturaCard';
import GestaoMaquinarioCard from './GestaoMaquinarioCard';
import GestaoPecuariaCard from './GestaoPecuariaCard';
import GestaoFazendaCard from './GestaoFazendaCard';
import ClimaInteligenteCard from './ClimaInteligenteCard';

const Products = () => {
  const { startProduct, currentProduct, setStartProduct, setProductStatus, setLastProductName, productsOrder, productsStatus, lastProductName } = useProductsStore();
  const { setShowDashboard } = useDashboardStore();
  const { setCameraAnimate } = useCameraStore();
  const [showCard, setShowCard] = useState(false);
  
  const startCameraAnimation = (point, duration = 2) => {
    setCameraAnimate({ animate: true, point, duration });
  };

  const endProduct = () => {
    setProductStatus(currentProduct, 'completed');
    setShowCard(false);
    setShowDashboard(true);
    setLastProductName(currentProduct);

    const currentIndex = productsOrder.indexOf(currentProduct);
    if (currentIndex !== -1 && currentIndex < productsOrder.length - 1) {
      const nextProduct = productsOrder[currentIndex + 1];
      if (productsStatus[nextProduct] === 'locked') {
        setProductStatus(nextProduct, 'unlocked');
      }
    }
  };

  const onContinueClick = () => {
    setShowCard(false);
    // libera interaçao
  };

  const onSkipClick = () => {
    endProduct();
  };

  const startProductHandler = () => {
    if (currentProduct === lastProductName) {
      setShowCard(true);
      return;
    }

    const showCardOffset = -500;
    const duration = 2;
    const delay = duration * 1000 + showCardOffset;
    switch (currentProduct) {
      case 'agro-cobertura':
        startCameraAnimation([-30, 0, -8], duration);
        break;
      case 'gestao-maquinario':
        startCameraAnimation([30, 0, -8], duration);
        break;
      case 'gestao-pecuaria':
        startCameraAnimation([-30, 0, -16], duration);
        break;    
      case 'clima-inteligente':
        startCameraAnimation([30, 0, -16], duration);
        break;  
      case 'gestao-fazenda':
        startCameraAnimation([0, 0, -16], duration);
        break;                   
      default:
        break;
    } 

    setTimeout(() => {
      setShowCard(true);
    }, delay);
  }

  useEffect(() => {
    if (startProduct) {
      startProductHandler();
      setStartProduct(false);
    }
  }, [startProduct, setStartProduct]);

  const productComponents = {
    'agro-cobertura': AgroCoberturaCard,
    'gestao-maquinario': GestaoMaquinarioCard,
    'gestao-pecuaria': GestaoPecuariaCard,
    'clima-inteligente': ClimaInteligenteCard,
    'gestao-fazenda': GestaoFazendaCard,
  };

  const ProductComponent = productComponents[currentProduct] || null;

  return (
    <div className="products-container">
      {ProductComponent && (
        <ProductComponent
          isVisible={showCard}
          onContinueClick={onContinueClick}
          onSkipClick={onSkipClick}
        />
      )}
    </div>
  );
};

export default Products;