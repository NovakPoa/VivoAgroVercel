import React from 'react';
import Solo from './BaseObjects/Solo';
import Casa from './BaseObjects/Casa';
import Cercas from './BaseObjects/Cercas';
import Galpao from './BaseObjects/Galpao';
import Ornamentos from './BaseObjects/Ornamentos';
import Vegetaçao from './BaseObjects/Vegetaçao';
import Mesa from './BaseObjects/Mesa';

const BaseObjects = () => {
  return (
    <group>
      <Solo />
      <Casa />
      <Cercas />
      <Galpao />
      <Ornamentos />   
      <Vegetaçao /> 
      {/* <Mesa />  */}
    </group>
  );
};

export default BaseObjects;