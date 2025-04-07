import React from 'react';
import Fazenda from './Ambiente/Fazenda';
import Vegetaçao from './Ambiente/Vegetaçao';
import Mesa from './BaseObjects/Mesa';

const BaseObjects = () => {
  return (
    <group>
      <Fazenda />  
      <Vegetaçao /> 
      {/* <Mesa />  */}
    </group>
  );
};

export default BaseObjects;