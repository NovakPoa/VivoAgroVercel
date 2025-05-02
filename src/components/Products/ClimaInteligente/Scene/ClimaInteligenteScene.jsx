import React from 'react';
import Placeholders from '../../../Commons/Scene/Placeholders/Placeholders';
import useProductScene from '../../../../hooks/useProductScene';
import Estacao from '../../../Scene/Objects/Experiencia/Products/ClimaInteligente/Estacao';
import EstacaoSmall from '../../../Scene/Objects/Experiencia/Products/ClimaInteligente/EstacaoSmall';
import TabletClima from '../../../Scene/Objects/Experiencia/Products/ClimaInteligente/TabletClima';
import ClimaNeon from '../../../Scene/Objects/Experiencia/Products/ClimaInteligente/ClimaNeon'; 

const PRODUCT_ID = 'clima-inteligente';
const START_NEON_DELAY = 0;                     // inicia quando slot é selecionado
const START_FIRST_ANIMATION_DELAY = 3000;      // inicia quando slot é selecionado
const SHOW_TIMER_CARD_DELAY = 5000;            // inicia quando slot é selecionado
const SHOW_TABLET_DELAY = 4000;                 // inicia quando card com timer termina
const HIDE_TABLET_DELAY = 12000;                  // inicia quando card com timer termina
const START_END_PRODUCT_DELAY = 13000;          // inicia quando card com timer termina  

const SMALL_OBJECT_POSITION = [0, 1.2, 0.5];
const SMALL_OBJECT_LOOKAT = [0, 0.8, 10];
const CAMERA_TARGET = [0, 1.7, 10];
const INITIAL_PLACEHOLDER_POSITIONS = [
  [8, 0, 25],
  [0, 0, 10],
  [-3, 0, 12],
];
const PLACEHOLDER_LOOKAT_OFFSET = [0, 1.5, 0];
const TABLET = {
  position: [0.4, 1.2, 0.8],
  rotation: [0, 0.2, 0],
  scale: 0.015,
};

const ClimaInteligenteScene = () => {
  const {
    shouldRenderMainObject,
    selectedPosition,
    placeholderPositions,
    animateTablet,
    shouldRenderPlaceholders,
    placeholdersVisible,
    shouldRenderSmallObject,
    smallObjectVisible,    
    handlePlaceholderAnimationOutEnded,
    handleSmallObjAnimationOutEnded,
    shouldPlaySecondAnimation,
    shouldSkipProduct,
    shouldRenderNeon,
    setShouldRenderNeon  
  } = useProductScene(
    PRODUCT_ID,
    INITIAL_PLACEHOLDER_POSITIONS, 
    CAMERA_TARGET,
    START_NEON_DELAY,
    START_FIRST_ANIMATION_DELAY,
    SHOW_TIMER_CARD_DELAY,
    SHOW_TABLET_DELAY,
    HIDE_TABLET_DELAY,
    START_END_PRODUCT_DELAY,   
    SMALL_OBJECT_LOOKAT,
    PLACEHOLDER_LOOKAT_OFFSET
  );
  
  return (
    <group>
      {shouldRenderMainObject && selectedPosition && (
        <Estacao position={selectedPosition} playSecondAnimation={shouldPlaySecondAnimation} skipProduct={shouldSkipProduct} />
      )}    

      {shouldRenderNeon && (
        <ClimaNeon onAnimationEnd={() => setShouldRenderNeon(false)} />
      )} 

      {shouldRenderPlaceholders && (
        <Placeholders 
          placeholderPositions={placeholderPositions}
          isVisible={placeholdersVisible}
          onAnimationOutEnded={handlePlaceholderAnimationOutEnded}
        />
      )}

      {shouldRenderSmallObject && (
        <EstacaoSmall 
          position={SMALL_OBJECT_POSITION}
          scale={0.1}
          isVisible={smallObjectVisible} 
          onAnimationOutEnded={handleSmallObjAnimationOutEnded}            
        />
      )}

      <TabletClima
        position={TABLET.position}
        rotation={TABLET.rotation}
        scale={TABLET.scale}
        animateTablet={animateTablet}
      />
    </group>
  );
};

export default ClimaInteligenteScene;