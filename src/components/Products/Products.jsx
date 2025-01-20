import React, { useContext } from 'react';
import AgroCobertura from '../Products/AgroCobertura';
import GestaoMaquinario from '../Products/GestaoMaquinario';
import { CardsContext } from '../../context/ProductsContext';

const Products = () => {
  const { showAgroCobertura, showGestaoMaquinario } = useContext(CardsContext);

  return (
    <div className="products-container">
      <AgroCobertura isVisible={showAgroCobertura} />
      <GestaoMaquinario isVisible={showGestaoMaquinario} />
    </div>
  );
};

export default Products;