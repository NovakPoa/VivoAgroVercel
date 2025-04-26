import React from 'react';
import Placeholders from '../../../Commons/Scene/Placeholders/Placeholders';
import useProductScene from '../../../../hooks/useProductScene';
import Antena from '../../../Scene/Objects/Experiencia/Products/AgroCobertura/Antena';
import AntenaSmall from '../../../Scene/Objects/Experiencia/Products/AgroCobertura/AntenaSmall';
import TabletAgro from '../../../Scene/Objects/Experiencia/Products/AgroCobertura/TabletAgro';

const PRODUCT_ID = 'agro-cobertura';
const START_NEON_DELAY = 4000;                  // inicia quando slot é selecionado
const START_FIRST_ANIMATION_DELAY = 0;          // inicia quando slot é selecionado
const SHOW_TIMER_CARD_DELAY = 5000;            // inicia quando slot é selecionado
const SHOW_TABLET_DELAY = 4000;                 // inicia quando card com timer termina
const HIDE_TABLET_DELAY = 12000;                  // inicia quando card com timer termina
const START_END_PRODUCT_DELAY = 13000;          // inicia quando card com timer termina  

const SMALL_OBJECT_POSITION = [0.5, 1.2, 0];
const CAMERA_ROTATION = [0, -90, 0];
const INITIAL_PLACEHOLDER_POSITIONS = [
  [35, 0, -10],
  [40, 0, 0],
  [40, 0, 12],
];
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
    handleSmallObjAnimationOutEnded 
  } = useProductScene(
    PRODUCT_ID,
    INITIAL_PLACEHOLDER_POSITIONS, 
    CAMERA_ROTATION,
    START_NEON_DELAY,
    START_FIRST_ANIMATION_DELAY,
    SHOW_TIMER_CARD_DELAY,
    SHOW_TABLET_DELAY,
    HIDE_TABLET_DELAY,
    START_END_PRODUCT_DELAY,   
  );

  return (
    <group>
      {shouldRenderMainObject && selectedPosition && (
        <Antena position={selectedPosition} />
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