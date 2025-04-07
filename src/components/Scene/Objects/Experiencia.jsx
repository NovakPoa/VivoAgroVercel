import React from 'react';
import IntroScene from '../../Intro/Scene/IntroScene';
import AgroCoberturaScene from '../../Products/AgroCobertura/Scene/AgroCoberturaScene';
import GestaoMaquinarioScene from '../../Products/GestaoMaquinario/Scene/GestaoMaquinarioScene';
import GestaoPecuariaScene from '../../Products/GestaoPecuaria/Scene/GestaoPecuariaScene';
import ClimaInteligenteScene from '../../Products/ClimaInteligente/Scene/ClimaInteligenteScene';

const Experiencia = () => {

  return (
    <group>
      <IntroScene />
      <AgroCoberturaScene />
      <GestaoMaquinarioScene />
      <ClimaInteligenteScene />
      <GestaoPecuariaScene />
    </group>
  );
};

export default Experiencia;