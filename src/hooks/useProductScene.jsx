import { useState, useEffect, useCallback, useRef } from 'react';
import useProductsStore from '../stores/ProductsStore';
import useInteractionStore from '../stores/InteractionStore';
import useSlotsStore from '../stores/SlotsStore';
import useCameraStore from '../stores/CameraStore';
import useDashboardStore from '../stores/DashboardStore';
import useEndStore from '../stores/EndStore';
import useComponentVisibility from './useComponentVisibility';

const useProductScene = (productId, initialPlaceholderPositions, cameraRotation) => {
  const { currentProduct, setLastProductName }  = useProductsStore();  
  const { 
    showInteraction, 
    setShowFirstInstruction, 
    setShowSecondInstruction,
    setTimerCompleteCallback, 
    setShowInteraction,
    showFirstInteraction,
    setShowFirstInteraction,
    showSecondInteraction,
    setShowSecondInteraction
  } = useInteractionStore(); 
  const { setShowDashboard } = useDashboardStore();
  const { setSlotsLength, setShowSlots, setSelectedIndex, selectedIndex } = useSlotsStore();
  const { registerProductRotation } = useCameraStore();
  const { setShowEndCard } = useEndStore();

  const [enableObject, setEnableObject] = useState(false);
  const [isCurrentProduct, setIsCurrentProduct] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [placeholderPositions, setPlaceholderPositions] = useState (initialPlaceholderPositions || []);
  const [animateTablet, setAnimateTablet] = useState(false);

  // Placeholders Visibility
  const [placeholdersVisible, setPlaceholdersVisible] = useState(false);
  const [shouldRenderPlaceholders, handlePlaceholderAnimationOutEnded] = useComponentVisibility(placeholdersVisible);
  // SmallObject Visibility
  const [smallObjectVisible, setSmallObjectVisible] = useState(false);
  const [shouldRenderSmallObject, handleSmallObjAnimationOutEnded] = useComponentVisibility(smallObjectVisible);

  useEffect(() => {
    setPlaceholdersVisible(showFirstInteraction && isCurrentProduct);
    setSmallObjectVisible(showFirstInteraction && isCurrentProduct);
  }, [showFirstInteraction, isCurrentProduct]);

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
  }, [selectedIndex, isCurrentProduct]);

  // Configurar callback para o timer da segunda interação
  useEffect(() => {
    if (showSecondInteraction && isCurrentProduct) {
      setTimerCompleteCallback(endSecondInteraction);
    }
  }, [showSecondInteraction, isCurrentProduct]);

  // Termina Produto pela cena
  const endProduct = useCallback(() => {
    useProductsStore.getState().completeProduct(currentProduct);
    setLastProductName(currentProduct);
    setShowInteraction(false);

    if (currentProduct === 'clima-inteligente') {
      setShowEndCard(true);
    } else {
      setShowDashboard(true);
    }    
  }, [ currentProduct ]);

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
  }, [setShowSecondInstruction, createTimer, endProduct]);

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
    selectedIndex,
    placeholdersVisible,
    shouldRenderPlaceholders,
    handlePlaceholderAnimationOutEnded,
    smallObjectVisible,
    shouldRenderSmallObject,
    handleSmallObjAnimationOutEnded,
  };
};

export default useProductScene;