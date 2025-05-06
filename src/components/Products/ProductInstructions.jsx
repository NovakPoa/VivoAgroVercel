import React from 'react';
import useProductsStore from '../../stores/ProductsStore';
import useInteractionStore from '../../stores/InteractionStore';
import productRegistry from '../../config/productRegistry';

const ProductInstructions = () => {
  const currentProduct = useProductsStore(state => state.currentProduct);
  const showFirstInstruction = useInteractionStore(state => state.showFirstInstruction);
  const showSecondInstruction = useInteractionStore(state => state.showSecondInstruction);

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