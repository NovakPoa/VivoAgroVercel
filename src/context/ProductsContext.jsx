import React, { createContext, useState } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [showAgroCobertura, setShowAgroCobertura] = useState(false);
  const [showGestaoMaquinario, setShowGestaoMaquinario] = useState(false);
  

  return (
    <ProductsContext.Provider value={{ showAgroCobertura, setShowAgroCobertura, showGestaoMaquinario, setShowGestaoMaquinario }}>
      {children}
    </ProductsContext.Provider>
  );
};