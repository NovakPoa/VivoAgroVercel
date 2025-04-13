import React from 'react';
import useProductsStore from '../../stores/ProductsStore';
import useProductNavigation from '../../hooks/useProductNavigation';
import productRegistry from '../../config/productRegistry';
import ProductInstructions from './ProductInstructions';
import Slots from '../Commons/UI/Slots/Slots';

const Products = () => {
/*   const currentProduct = useProductsStore(state => state.currentProduct);
  const lastProductName = useProductsStore(state => state.lastProductName); */
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

  const { showCard, onContinueClick, onSkipClick } = useProductNavigation();

  const ProductCard = productRegistry[currentProduct]?.card;

  React.useEffect(() => {
    console.log('currentProduct: ', currentProduct);
  }, [currentProduct]);
  React.useEffect(() => {
    console.log('lastProductName: ', lastProductName);
  }, [lastProductName]);
  React.useEffect(() => {
    console.log('productsStatus: ', productsStatus);
  }, [productsStatus]);

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