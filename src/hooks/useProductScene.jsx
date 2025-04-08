import { useState, useEffect } from 'react';
import useProductsStore from '../stores/ProductsStore';
import useInteractionStore from '../stores/InteractionStore';
import useProductNavigation from './useProductNavigation';

const useProductScene = (productId) => {
  const { currentProduct}  = useProductsStore();  
  const {
    showInteraction,
    setShowFirstInstruction, 
    setShowSecondInstruction
  } = useInteractionStore(); 
  const { endProduct } = useProductNavigation();
  const { setTimerCompleteCallback } = useInteractionStore();
  const [enableObject, setEnableObject] = useState(false);
  const [showFirstInteraction, setShowFirstInteraction] = useState(false);
  const [showSecondInteraction, setShowSecondInteraction] = useState(false);
  const [isCurrentProduct, setIsCurrentProduct] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  
  useEffect(() => {
    if (showInteraction && currentProduct === productId) {
      setShowFirstInstruction(true);
      setShowFirstInteraction(true);
    }
  }, [showInteraction, currentProduct, productId, setShowFirstInstruction]);

  useEffect(() => {
    if (currentProduct === productId) {
      setEnableObject(true);
      setIsCurrentProduct(true);
    } else {
      setIsCurrentProduct(false);
    }
  }, [currentProduct, productId]);

  const handleSlotClick = (position) => {
    setSelectedPosition(position);
    setShowFirstInstruction(false);
    setShowFirstInteraction(false);
    setTimeout(() => {
      setShowSecondInstruction(true);
      setShowSecondInteraction(true);
    }, 1000);
  };

  useEffect(() => {
    if (showSecondInteraction && isCurrentProduct) {
      setTimerCompleteCallback(endSecondInteraction);
    }
  }, [showSecondInteraction, isCurrentProduct]);

  const endSecondInteraction = () => {
    setShowSecondInstruction(false);
    setShowSecondInteraction(false);
    setTimeout(() => {
      // mostrar tablet
      endProduct();
    }, 1000);
  }; 

  return {
    enableObject,
    showFirstInteraction,
    showSecondInteraction,
    isCurrentProduct,
    selectedPosition,
    setSelectedPosition,
    handleSlotClick,
    endSecondInteraction
  };
};

export default useProductScene;