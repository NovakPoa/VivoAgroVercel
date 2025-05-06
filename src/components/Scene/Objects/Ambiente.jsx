import React from 'react';
import Fazenda from './Ambiente/Fazenda';
import Vegetacao from './Ambiente/Vegetacao';
import Mesas from './Ambiente/Mesas';

const Ambiente = () => {
  return (
    <group>
      <Fazenda />
      <Vegetacao />
      <Mesas />
    </group>
  );
};

export default Ambiente;