import React from 'react';
import InteractionObjects from './Interactions/InteractionObjects';
import IntroLogo from './Experiencia/Intro/IntroLogo';
//import Tractors from './Tractors';
//import Cows from './Cows';
import useIntroStore from '../../../stores/IntroStore';

const Experiencia = () => {
  const { introObjectVisible } = useIntroStore();
  
  return (
    <group>
      <InteractionObjects />
      {introObjectVisible && <IntroLogo />}
      {/* <Tractors /> */}
      {/* <Cows /> */}
    </group>
  );
};

export default Experiencia;