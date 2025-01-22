import React, { useContext } from 'react';
import AgroCobertura from '../Products/AgroCobertura/AgroCobertura';
import useAgroCoberturaStore from '../../stores/AgroCoberturaStore';

const Products = () => {
  const { startAgroCobertura } = useAgroCoberturaStore();

  return (
    <div className="products-container">
      <AgroCobertura isVisible={startAgroCobertura} />
    </div>
  );
};

export default Products;