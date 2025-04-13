import { useState, useEffect, useCallback, useRef } from 'react';
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

    // Referência para os timers
    const timersRef = useRef([]);
  
    // Função para limpar todos os timers pendentes
    const clearAllTimers = useCallback(() => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    }, []);
    
    // Função para criar um timer e armazená-lo para limpeza posterior
    const createTimer = useCallback((callback, delay) => {
      const timerId = setTimeout(callback, delay);
      timersRef.current.push(timerId);
      return timerId;
    }, []);

  // Registrar a rotação da câmera para este produto
  useEffect(() => {
    if (cameraRotation) {
      registerProductRotation(productId, cameraRotation);
    }
  }, []);
  
  // Gerenciar o estado do produto atual
  useEffect(() => {
    const isThisProductCurrent = currentProduct === productId;
    setIsCurrentProduct(isThisProductCurrent);
    
    if (isThisProductCurrent) {
      setEnableObject(true);
    }
  }, [currentProduct, productId]);
  
  // Iniciar primeira interação
  useEffect(() => {
    if (showInteraction && isCurrentProduct) {
      setShowFirstInstruction(true);
      setShowFirstInteraction(true);
    }
  }, [showInteraction, isCurrentProduct]);

  // Configurar slots quando a primeira interação é mostrada
  useEffect(() => {
    if (showFirstInteraction && isCurrentProduct) {
      setSlotsLength(placeholderPositions.length);
      setShowSlots(true);
    } else if (!showFirstInteraction && isCurrentProduct) {
      setSelectedIndex(-1);
    }
  }, [showFirstInteraction, isCurrentProduct]);

  // Reagir quando um slot é selecionado
  useEffect(() => {
    if (selectedIndex > -1 && isCurrentProduct && placeholderPositions[selectedIndex]) {
      handleSlotClick(placeholderPositions[selectedIndex]);
    }
  }, [selectedIndex, isCurrentProduct, placeholderPositions]);

  // Configurar callback para o timer da segunda interação
  useEffect(() => {
    if (showSecondInteraction && isCurrentProduct) {
      setTimerCompleteCallback(endSecondInteraction);
    }
  }, [showSecondInteraction, isCurrentProduct]);

  // Limpar timers quando o componente é desmontado
  useEffect(() => {
    return clearAllTimers;
  }, [clearAllTimers]);

  // Callbacks
  const handleSlotClick = useCallback((position) => {
    if (isCurrentProduct) {
      setSelectedPosition(position);
      setShowFirstInstruction(false);
      setShowFirstInteraction(false);
      
      createTimer(() => {
        setShowSecondInstruction(true);
        setShowSecondInteraction(true);
      }, 4000);
    }
  }, [isCurrentProduct]);

  const endSecondInteraction = useCallback(() => {
    setShowSecondInstruction(false);
    setShowSecondInteraction(false);
    
    createTimer(() => {
      setAnimateTablet(true);
    }, 4000);
    
    createTimer(() => {
      endProduct();
    }, 8000);
  }, []);

  return {
    enableObject,
    showFirstInteraction,
    showSecondInteraction,
    isCurrentProduct,
    selectedPosition,
    animateTablet,
    handleSlotClick,
    endSecondInteraction,
    placeholderPositions,
    setPlaceholderPositions
  };
};

export default useProductScene;