import React from 'react';
import useProductsStore from '../../stores/ProductsStore';
import productRegistry from '../../config/productRegistry';

const ProductInstructions = () => {
  const { 
    currentProduct,
    showFirstInstruction,
    showSecondInstruction
  } = useProductsStore();

  const productComponents = productRegistry[currentProduct]?.instructions || {};
  const FirstInstruction = productComponents.first;
  const SecondInstruction = productComponents.second;

  return (
    <>
      {FirstInstruction && (
        <FirstInstruction isVisible={showFirstInstruction} />
      )}
      
      {SecondInstruction && (
        <SecondInstruction isVisible={showSecondInstruction} />
      )}
    </>
  );
};

export default ProductInstructions;