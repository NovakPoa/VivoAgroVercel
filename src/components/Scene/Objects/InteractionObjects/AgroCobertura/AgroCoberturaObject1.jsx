import React from 'react';
import DraggableObject from '../DraggableObject';

const AgroCoberturaObject1 = () => {
  const initialPosition = [-5, 0, 5];
  const dropPoints = [
    [-5, 2, 8],
    [-5, 2, 5],
    [-5, 2, -8],
    initialPosition
  ];

  return (
    <DraggableObject
      initialPosition={initialPosition}
      dropPoints={dropPoints}
      geometry={<boxGeometry args={[1, 1, 1]} />}
      material={<meshStandardMaterial color={'blue'} />}
    />
  );
};

export default AgroCoberturaObject1;