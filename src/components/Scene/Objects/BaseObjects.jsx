import React from 'react';
import Terrain from './BaseObjects/Terrain';
//import Buildings from './Buildings';
//import Trees from './Trees';

const BaseObjects = () => {
  return (
    <group>
      <Terrain />
      {/* <Buildings /> */}
    </group>
  );
};

export default BaseObjects;