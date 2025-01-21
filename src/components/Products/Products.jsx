import React, { useContext } from 'react';
import AgroCobertura from '../Products/AgroCobertura/AgroCobertura';
import useAgroCoberturaStore from '../../stores/AgroCoberturaStore';

const Products = () => {
  const { agroCoberturaObjectVisible } = useAgroCoberturaStore();

  return (
    <div className="products-container">
      <AgroCobertura isVisible={agroCoberturaObjectVisible} />
    </div>
  );
};

export default Products;