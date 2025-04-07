import React, { useState, useEffect } from 'react';
import useProductsStore from '../../../../stores/ProductsStore';
import ProductFirstInteraction from '../../../Commons/Scene/ProductFirstInteraction';
import ProductSecondInteraction from '../../../Commons/Scene/ProductSecondInteraction';
import useProductNavigation from '../../../../hooks/useProductNavigation';
import Antena from '../../../Scene/Objects/Experiencia/Products/AgroCobertura/Antena';

const AgroCoberturaScene = () => {
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
    [50, 0, -20],
    [50, 0, 5],
    [50, 0, 35],
  ];
  
  const buttonPosition = [0.5, 1.2, 0];

  useEffect(() => {
    if (showInteraction && currentProduct === 'agro-cobertura') {
      setShowFirstInstruction(true);
      setShowFirstInteraction(true);
    }
  }, [showInteraction]);

  useEffect(() => {
    if (currentProduct === 'agro-cobertura') {
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
      {enableObject && selectedPosition && (
        <Antena 
        position={selectedPosition}
        />
      )}
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

export default AgroCoberturaScene;