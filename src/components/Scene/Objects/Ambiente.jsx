import React from 'react';
import Fazenda from './Ambiente/Fazenda';
import Vegetaçao from './Ambiente/Vegetaçao';
import Mesas from './Ambiente/Mesas';

const Ambiente = () => {
  return (
    <group>
      <Fazenda />  
      <Vegetaçao /> 
      <Mesas /> 
    </group>
  );
};

export default Ambiente;