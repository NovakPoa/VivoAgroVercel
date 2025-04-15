import React from 'react';
import IntroLogo from '../../Scene/Objects/Experiencia/Intro/IntroLogo';
import IntroNeon from '../../Scene/Objects/Experiencia/Intro/IntroNeon';
import useIntroStore from '../../../stores/IntroStore';

const IntroScene = () => {
  const { introVisibility } = useIntroStore();
  
  return (
    <group>
      {introVisibility && <IntroLogo />}
      {introVisibility && <IntroNeon />}
    </group>
  );
};

export default IntroScene;