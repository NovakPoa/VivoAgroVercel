import React, { useEffect, useState } from 'react';
import useProductsStore from '../../stores/ProductsStore';
import useCameraStore from '../../stores/CameraStore';
import AgroCoberturaCard from './AgroCoberturaCard';
import GestaoMaquinarioCard from './GestaoMaquinarioCard';

const Products = () => {
  const { startProduct, currentProduct, setStartProduct } = useProductsStore();
  const { setCameraAnimate } = useCameraStore();
  const [showCard, setShowCard] = useState(false);
  const showCardDelay = 2000;

  const startCameraAnimation = (point) => {
    setCameraAnimate({ animate: true, point });
  };

  const onContinueClick = () => {
    setShowCard(false);
    // libera interaçao
  };

  const onSkipClick = () => {
    setShowCard(false);
    // abre dashboard
  };

  const startProductHandler = () => {
    switch (currentProduct) {
      case 'agro-cobertura':
        startCameraAnimation([-30, 0, -8]);
        break;
      case 'gestao-maquinario':
        startCameraAnimation([30, 0, -8]);
        break;
      default:
        break;
    } 
    setTimeout(() => {
      setShowCard(true);
    }, showCardDelay);     
  }

  useEffect(() => {
    if (startProduct) {
      startProductHandler();
      setStartProduct(false);
    }
  }, [startProduct, setStartProduct]);

  return (
    <div className="products-container">
      {(() => {
        switch (currentProduct) {
          case 'agro-cobertura':
            return <AgroCoberturaCard isVisible={showCard} onContinueClick={onContinueClick} onSkipClick={onSkipClick} />
          case 'gestao-maquinario':
            <GestaoMaquinarioCard isVisible={showCard} onContinueClick={onContinueClick} onSkipClick={onSkipClick} />
          default:
            return null
        }
      })()}      
    </div>
  );
};

export default Products;