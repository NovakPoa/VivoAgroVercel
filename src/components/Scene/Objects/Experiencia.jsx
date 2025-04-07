import React from 'react';
import IntroScene from '../../Intro/Scene/IntroScene';
import AgroCoberturaScene from '../../Products/AgroCobertura/Scene/AgroCoberturaScene';
import GestaoMaquinarioScene from '../../Products/GestaoMaquinario/Scene/GestaoMaquinarioScene';

const Experiencia = () => {

  return (
    <group>
      <IntroScene />
      <AgroCoberturaScene />
      <GestaoMaquinarioScene />
    </group>
  );
};

export default Experiencia;