import React from 'react';
import Placeholders from '../../../Commons/Scene/Placeholders/Placeholders';
import useProductScene from '../../../../hooks/useProductScene';
import Antena from '../../../Scene/Objects/Experiencia/Products/AgroCobertura/Antena';
import AntenaSmall from '../../../Scene/Objects/Experiencia/Products/AgroCobertura/AntenaSmall';
import AgroNeon from '../../../Scene/Objects/Experiencia/Products/AgroCobertura/AgroNeon';
import TabletAgro from '../../../Scene/Objects/Experiencia/Products/AgroCobertura/TabletAgro';

const PRODUCT_ID = 'agro-cobertura';
const START_NEON_DELAY = 4000;                  // inicia quando slot é selecionado
const START_FIRST_ANIMATION_DELAY = 0;          // inicia quando slot é selecionado
const SHOW_TIMER_CARD_DELAY = 5000;            // inicia quando slot é selecionado
const SHOW_TABLET_DELAY = 4000;                 // inicia quando card com timer termina
const HIDE_TABLET_DELAY = 12000;                  // inicia quando card com timer termina
const START_END_PRODUCT_DELAY = 13000;          // inicia quando card com timer termina  

const SMALL_OBJECT_POSITION = [0.5, 1.2, 0];
const SMALL_OBJECT_LOOKAT = [10, 0.8, 0];
const CAMERA_TARGET = [10, 1.7, 0];
const INITIAL_PLACEHOLDER_POSITIONS = [
  [35, 0, -10],
  [40, 0, 0],
  [40, 0, 12],
];
const PLACEHOLDER_LOOKAT_OFFSET = [0, 10, 0];
const TABLET = {
  position: [1.1, 1.2, 0.4],
  rotation: [0, -3.5, 0],
  scale: 0.015,
};

const AgroCoberturaScene = () => {
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
        <Antena position={selectedPosition} playSecondAnimation={shouldPlaySecondAnimation} skipProduct={shouldSkipProduct}/>
      )}   

      {shouldRenderNeon && (
        <AgroNeon onAnimationEnd={() => setShouldRenderNeon(false)} />
      )}  

      {shouldRenderPlaceholders && (
        <Placeholders 
          placeholderPositions={placeholderPositions}
          isVisible={placeholdersVisible} 
          onAnimationOutEnded={handlePlaceholderAnimationOutEnded}
        />
      )}
      
      {shouldRenderSmallObject && (
        <AntenaSmall 
          position={SMALL_OBJECT_POSITION}
          scale={0.015}
          isVisible={smallObjectVisible} 
          onAnimationOutEnded={handleSmallObjAnimationOutEnded}            
        />
      )}
        
      <TabletAgro
        position={TABLET.position}
        rotation={TABLET.rotation}
        scale={TABLET.scale}
        animateTablet={animateTablet}
      />
    </group>
  );
};

export default AgroCoberturaScene;