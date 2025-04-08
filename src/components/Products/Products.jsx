import React from 'react';
import useProductsStore from '../../stores/ProductsStore';
import useInteractionStore from '../../stores/InteractionStore';
import useProductNavigation from '../../hooks/useProductNavigation';
import productRegistry from '../../config/productRegistry';
import ProductInstructions from './ProductInstructions';
import Slots from '../Commons/UI/Slots/Slots';

const Products = () => {
  const { currentProduct } = useProductsStore();
  const { setShowInteraction } = useInteractionStore();
  const { showCard, onContinueClick, onSkipClick } = useProductNavigation();

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
      <Slots />
    </div>
  );
};

export default Products;