import React, { useContext } from 'react';
import AgroCobertura from '../Products/AgroCobertura/AgroCobertura';
import GestaoMaquinario from '../Products/GestaoMaquinario/GestaoMaquinario';
import useAgroCoberturaStore from '../../stores/AgroCoberturaStore';

const Products = () => {
  const { startAgroCobertura } = useAgroCoberturaStore();

  return (
    <div className="products-container">
      <GestaoMaquinario isVisible={startAgroCobertura} />
    </div>
  );
};

export default Products;