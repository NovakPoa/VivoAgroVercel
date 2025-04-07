import React from 'react';
import useProductsStore from '../../stores/ProductsStore';
import useProductNavigation from '../../hooks/useProductNavigation';
import productRegistry from '../../config/productRegistry';
import ProductInstructions from './ProductInstructions';

const Products = () => {
  const { currentProduct, setShowInteraction } = useProductsStore();
  const { showCard, setShowCard, endProduct } = useProductNavigation();
  
  const onContinueClick = () => {
    setShowCard(false);
    setShowInteraction(true);
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