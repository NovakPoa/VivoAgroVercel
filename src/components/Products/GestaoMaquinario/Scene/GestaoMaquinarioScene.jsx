import React, { useState, useEffect } from 'react';
import Placeholders from '../../../Commons/Scene/Placeholders/Placeholders';
import useProductScene from '../../../../hooks/useProductScene';
import Tratores from '../../../Scene/Objects/Experiencia/Products/GestaoMaquinario/Tratores';
import DispositivoMaquinario from '../../../Scene/Objects/Experiencia/Products/GestaoMaquinario/DispositivoMaquinario';
import Tablet from '../../../Scene/Objects/Experiencia/Products/Tablet';

const INITIAL_PLACEHOLDER_POSITIONS = [
  [50, 0, -20],
  [50, 0, 5],
  [50, 0, 35],
];
const INTERACTION_OBJECT_POSITION = [0, 1.2, 0.5];
const CAMERA_ROTATION = [0, -180, 0];
const TABLET = {
  position: [-0.4, 1.2, 0.8],
  rotation: [0, 0.2, 0],
  scale: 0.015,
};

const GestaoMaquinarioScene = () => {
  const {
    enableObject,
    showFirstInteraction,
    isCurrentProduct,
    selectedPosition,
    placeholderPositions,
    setPlaceholderPositions,
    animateTablet
  } = useProductScene('gestao-maquinario', INITIAL_PLACEHOLDER_POSITIONS, CAMERA_ROTATION);
  
  const handleObjectPositionUpdate = (position, tratorIndex) => {
    if (position) {
      setPlaceholderPositions(prevPositions => {
        const newPositions = [...prevPositions];
        if (tratorIndex >= 0 && tratorIndex < newPositions.length) {
          newPositions[tratorIndex] = [position.x, position.y, position.z];
        }
        return newPositions;
      });
    }
  };

  return (
    <group>
      <Tratores onObjectPositionUpdate={handleObjectPositionUpdate} />

      {enableObject && selectedPosition && (
        <DispositivoMaquinario position={selectedPosition} />
      )} 

      {showFirstInteraction && isCurrentProduct && (
        <>
          <Placeholders 
            placeholderPositions={placeholderPositions}
          />
          <DispositivoMaquinario position={INTERACTION_OBJECT_POSITION} scale={0.08} />
        </>
      )}
      
      <Tablet position={TABLET.position} rotation={TABLET.rotation} scale={TABLET.scale} animateTablet={animateTablet}/>
    </group>
  );
};

export default GestaoMaquinarioScene;