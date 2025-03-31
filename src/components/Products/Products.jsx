import React from 'react';
import useProductsStore from '../../stores/ProductsStore';
import useInteractionStore from '../../stores/InteractionStore';
import useProductNavigation from '../../hooks/useProductNavigation';
import productRegistry from '../../config/productRegistry';
import ProductInstructions from './ProductInstructions';

const Products = () => {
  const { currentProduct, setShowFirstInstruction } = useProductsStore();
  const { setInteraction } = useInteractionStore();
  const { showCard, setShowCard, endProduct } = useProductNavigation();
  
  const onContinueClick = () => {
    setShowCard(false);
    setInteraction(currentProduct);
    setShowFirstInstruction(true);
  };

  const onSkipClick = () => {
    endProduct();
  };

  const ProductCard = productRegistry[currentProduct]?.card;

  return (
    <div className="products-container">
      {ProductCard && (
        <ProductCard
          isVisible={showCard}
          onContinueClick={onContinueClick}
          onSkipClick={onSkipClick}
        />
      )}

      <ProductInstructions />
    </div>
  );
};

export default Products;