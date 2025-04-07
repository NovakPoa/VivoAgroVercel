import React from 'react';
import Fazenda from './Ambiente/Fazenda';
import Vegetaçao from './Ambiente/Vegetaçao';
import Mesa from './Ambiente/Mesa';

const Ambiente = () => {
  return (
    <group>
      <Fazenda />  
      <Vegetaçao /> 
      {/* <Mesa />  */}
    </group>
  );
};

export default Ambiente;