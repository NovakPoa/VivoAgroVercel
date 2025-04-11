import { useState, useEffect } from 'react';
import useProductsStore from '../stores/ProductsStore';
import useInteractionStore from '../stores/InteractionStore';
import useSlotsStore from '../stores/SlotsStore';
import useCameraStore from '../stores/CameraStore';
import useProductNavigation from './useProductNavigation';

const useProductScene = (productId, initialPlaceholderPositions, cameraRotation) => {
  const { currentProduct}  = useProductsStore();  
  const { showInteraction, setShowFirstInstruction, setShowSecondInstruction } = useInteractionStore(); 
  const { endProduct } = useProductNavigation();
  const { setTimerCompleteCallback } = useInteractionStore();
  const { setSlotsLength, setShowSlots, setSelectedIndex, selectedIndex } = useSlotsStore();
  const { registerProductRotation } = useCameraStore();

  const [enableObject, setEnableObject] = useState(false);
  const [showFirstInteraction, setShowFirstInteraction] = useState(false);
  const [showSecondInteraction, setShowSecondInteraction] = useState(false);
  const [isCurrentProduct, setIsCurrentProduct] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [placeholderPositions, setPlaceholderPositions] = useState (initialPlaceholderPositions || []);
  const [animateTablet, setAnimateTablet] = useState(false);

  useEffect(() => {
    if (cameraRotation) {
      registerProductRotation(productId, cameraRotation);
    }
  }, [productId, cameraRotation, registerProductRotation]);
  
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

  useEffect(() => {
    if (selectedIndex > -1 && isCurrentProduct) {
      handleSlotClick(placeholderPositions[selectedIndex]);
    }
  }, [selectedIndex, isCurrentProduct, placeholderPositions]);

  useEffect(() => {
    if (showFirstInteraction && isCurrentProduct) {
      setSlotsLength(placeholderPositions.length);
      setShowSlots(true);
    } else {
      setShowSlots(false);
      setSelectedIndex(-1);
    }
  }, [showFirstInteraction, isCurrentProduct, setSlotsLength, setShowSlots, placeholderPositions.length]);

  useEffect(() => {
    if (showSecondInteraction && isCurrentProduct) {
      setTimerCompleteCallback(endSecondInteraction);
    }
  }, [showSecondInteraction, isCurrentProduct]);

  const handleSlotClick = (position) => {
    if (isCurrentProduct) {
      setSelectedPosition(position);
      setShowFirstInstruction(false);
      setShowFirstInteraction(false);
      setTimeout(() => {
        setShowSecondInstruction(true);
        setShowSecondInteraction(true);
      }, 1000);
    }
  };

  const endSecondInteraction = () => {
    setShowSecondInstruction(false);
    setShowSecondInteraction(false);
    setTimeout(() => {
      // mostrar tablet
      setAnimateTablet(true);
    }, 2000);
    setTimeout(() => {
      endProduct();
    }, 10000);    
  }; 

  return {
    enableObject,
    showFirstInteraction,
    showSecondInteraction,
    isCurrentProduct,
    selectedPosition,
    setSelectedPosition,
    animateTablet,
    handleSlotClick,
    endSecondInteraction,
    placeholderPositions,
    setPlaceholderPositions
  };
};

export default useProductScene;