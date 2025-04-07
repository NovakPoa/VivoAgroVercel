import React, { useState, useEffect } from 'react';
import useProductsStore from '../../../../stores/ProductsStore';
import ProductFirstInteraction from '../../../Commons/Scene/ProductFirstInteraction';
import ProductSecondInteraction from '../../../Commons/Scene/ProductSecondInteraction';
import useProductNavigation from '../../../../hooks/useProductNavigation';

const GestaoMaquinarioScene = () => {
  const { 
    currentProduct, 
    showInteraction,
    setShowFirstInstruction, 
    setShowSecondInstruction,
  } = useProductsStore();  
  const { endProduct } = useProductNavigation();
  const [enableObject, setEnableObject] = useState(false);
  const [showFirstInteraction, setShowFirstInteraction] = useState(false);
  const [showSecondInteraction, setShowSecondInteraction] = useState(false);
  const [isCurrentProduct, setIsCurrentProduct] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  
  const placeholderPositions = [
    [-20, 0, 50],
    [0, 0, 50],
    [20, 0, 50],
  ];
  
  const buttonPosition = [0, 1.2, 0.5];

  useEffect(() => {
    if (showInteraction && currentProduct === 'gestao-maquinario') {
      setShowFirstInstruction(true);
      setShowFirstInteraction(true);
    }
  }, [showInteraction]);

  useEffect(() => {
    if (currentProduct === 'gestao-maquinario') {
      setEnableObject(true);
      setIsCurrentProduct(true);
    } else {
      setIsCurrentProduct(false);
    }
  }, [currentProduct]);

  const handleSlotClick = (position) => {
    setSelectedPosition(position);
    setShowFirstInstruction(false);
    setShowFirstInteraction(false);
    setTimeout(() => {
      setShowSecondInstruction(true);
      setShowSecondInteraction(true);
    }, 1000);
  };

  const handleButtonClick = () => {
    setShowSecondInstruction(false);
    setShowSecondInteraction(false);
    setTimeout(() => {
      // show tablet
      endProduct(); // remover
    }, 1000);
  };

  return (
    <group>
      {showFirstInteraction && isCurrentProduct && (
        <ProductFirstInteraction 
        placeholderPositions={placeholderPositions}
        onSlotClick={handleSlotClick}
        />
      )}
      {showSecondInteraction && isCurrentProduct && (
        <ProductSecondInteraction 
        buttonPosition={buttonPosition}
        onButtonClick={handleButtonClick}
        />
      )}
    </group>
  );
};

export default GestaoMaquinarioScene;
  
