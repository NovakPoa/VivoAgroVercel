import React, { useState, useEffect, useRef } from 'react';
import Placeholders from '../../../Commons/Scene/Placeholders/Placeholders';
import useProductScene from '../../../../hooks/useProductScene';
import Vacas from '../../../Scene/Objects/Experiencia/Products/GestaoPecuaria/Vacas';
import DispositivosPecuaria from '../../../Scene/Objects/Experiencia/Products/GestaoPecuaria/DispositivosPecuaria';
import Brinco from '../../../Scene/Objects/Experiencia/Products/GestaoPecuaria/Brinco';
import BrincoSmall from '../../../Scene/Objects/Experiencia/Products/GestaoPecuaria/BrincoSmall';
import TabletPecuaria from '../../../Scene/Objects/Experiencia/Products/GestaoPecuaria/TabletPecuaria';

const PRODUCT_ID = 'gestao-pecuaria';
const START_NEON_DELAY = 0;                 // inicia quando slot é selecionado
const START_FIRST_ANIMATION_DELAY = 3000;      // inicia quando slot é selecionado
const SHOW_TIMER_CARD_DELAY = 5000;            // inicia quando slot é selecionado
const SHOW_TABLET_DELAY = 4000;                 // inicia quando card com timer termina
const HIDE_TABLET_DELAY = 12000;                  // inicia quando card com timer termina
const START_END_PRODUCT_DELAY = 13000;          // inicia quando card com timer termina  

const SMALL_OBJECT_POSITION = [0, 1.2, -0.7];
const SMALL_OBJECT_LOOKAT = [0, 0.8, -10];
const CAMERA_TARGET =  [0, 1.7, -10];
const INITIAL_PLACEHOLDER_POSITIONS = [
  [0, 0, 0],
  [0, 0, 0],
];
const PLACEHOLDER_LOOKAT_OFFSET = [0, 0, 0];
const TABLET = {
  position: [-0.1, 1.2, -0.8],
  rotation: [0, 0.9, 0],
  scale: 0.015,
};

const GestaoPecuariaScene = () => {
  const {
    shouldRenderMainObject,
    showFirstInteraction,
    isCurrentProduct,
    selectedPosition,
    animateTablet,
    selectedIndex,
    shouldRenderPlaceholders,
    placeholdersVisible,
    shouldRenderSmallObject,
    smallObjectVisible,    
    handlePlaceholderAnimationOutEnded,
    handleSmallObjAnimationOutEnded,
    shouldPlaySecondAnimation,
    shouldSkipProduct       
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

  const vacaPositionsRef = useRef(INITIAL_PLACEHOLDER_POSITIONS);
  const trackedVacaIndexRef = useRef(-1);

  const [dispositivoPosition, setDispositivoPosition] = useState(selectedPosition);
  const [placeholderPositions, setPlaceholderPositions] = useState(INITIAL_PLACEHOLDER_POSITIONS);

  useEffect(() => {
    if (selectedIndex >= 0 && isCurrentProduct) {
      trackedVacaIndexRef.current = selectedIndex;
      if (vacaPositionsRef.current[selectedIndex]) {
        setDispositivoPosition(vacaPositionsRef.current[selectedIndex]);
      }
    }
  }, [selectedIndex, isCurrentProduct]);

  const handleObjectPositionUpdate = (position, vacaIndex) => {
    if (position) {
      vacaPositionsRef.current[vacaIndex] = [position.x, position.y, position.z]; 
      // Atualizar os placeholders
      setPlaceholderPositions(prevPositions => {
        const newPositions = [...prevPositions];
        if (vacaIndex >= 0 && vacaIndex < newPositions.length) {
          newPositions[vacaIndex] = [position.x, position.y, position.z];
        }
        return newPositions;
      });
      // Atualizar a posição do dispositivo
      if (shouldRenderMainObject && trackedVacaIndexRef.current === vacaIndex) {
        setDispositivoPosition([position.x, position.y, position.z]);
      }
    }
  };

  return (
    <group>
      <DispositivosPecuaria />
      <Vacas onObjectPositionUpdate={handleObjectPositionUpdate} />

      {shouldRenderMainObject && dispositivoPosition && trackedVacaIndexRef.current >= 0 && (
        <Brinco 
          position={dispositivoPosition} 
          scale={0.5}
          playSecondAnimation={shouldPlaySecondAnimation}
          skipProduct={shouldSkipProduct}
        />
      )}

      {shouldRenderPlaceholders && (
        <Placeholders 
          placeholderPositions={placeholderPositions}
          isVisible={placeholdersVisible}
          onAnimationOutEnded={handlePlaceholderAnimationOutEnded}
        />
      )}
      
      {shouldRenderSmallObject && (
        <BrincoSmall 
          position={SMALL_OBJECT_POSITION}
          scale={0.2}
          isVisible={smallObjectVisible} 
          onAnimationOutEnded={handleSmallObjAnimationOutEnded}            
        />
      )}

      <TabletPecuaria
        position={TABLET.position}
        rotation={TABLET.rotation}
        scale={TABLET.scale}
        animateTablet={animateTablet}
      />
    </group>
  );
};

export default GestaoPecuariaScene;
  
