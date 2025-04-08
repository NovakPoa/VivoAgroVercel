import React, { useEffect } from 'react';
import ProductFirstInteraction from '../../../Commons/Scene/ProductFirstInteraction';
import ProductSecondInteraction from '../../../Commons/Scene/ProductSecondInteraction';
import useProductScene from '../../../../hooks/useProductScene';
import useSlotsStore from '../../../../stores/SlotsStore';
import Antena from '../../../Scene/Objects/Experiencia/Products/AgroCobertura/Antena';

const AgroCoberturaScene = () => {
  const {
    enableObject,
    showFirstInteraction,
    showSecondInteraction,
    isCurrentProduct,
    selectedPosition,
    handleSlotClick,
    handleButtonClick,
  } = useProductScene('agro-cobertura');
  
  const { setSlotsLength, setShowSlots, setSelectedIndex, selectedIndex } = useSlotsStore();

  const placeholderPositions = [
    [50, 0, -20],
    [50, 0, 5],
    [50, 0, 35],
  ];
  
  const smallObjectPosition = [0.5, 1.2, 0];
  
  useEffect(() => {
    if (selectedIndex > -1) {
      handleSlotClick(placeholderPositions[selectedIndex]);
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (showFirstInteraction && isCurrentProduct) {
      setSlotsLength(placeholderPositions.length);
      setShowSlots(true);
    } else {
      setShowSlots(false);
      setSelectedIndex(-1);
    }
  }, [showFirstInteraction, isCurrentProduct, setSlotsLength, setShowSlots]);

  return (
    <group>
      {enableObject && selectedPosition && (
        <Antena position={selectedPosition} />
      )}    
      {showFirstInteraction && isCurrentProduct && (
      <>
        <ProductFirstInteraction 
          placeholderPositions={placeholderPositions}
        />
        <Antena position={smallObjectPosition} scale={0.015} />
    </>
      )}
{/*       {showSecondInteraction && isCurrentProduct && (
        <ProductSecondInteraction 
          buttonPosition={smallObjectPosition}
          onButtonClick={handleButtonClick}
        />
      )} */}
    </group>
  );
};

export default AgroCoberturaScene;