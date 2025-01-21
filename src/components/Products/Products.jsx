import React, { useContext } from 'react';
import AgroCobertura from '../Products/AgroCobertura/AgroCobertura';
import { SceneContext } from '../../context/SceneContext';

const Products = () => {
  const { startAgroCobertura } = useContext(SceneContext);

  return (
    <div className="products-container">
      <AgroCobertura isVisible={startAgroCobertura} />
    </div>
  );
};

export default Products;