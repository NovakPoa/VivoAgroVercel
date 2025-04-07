import React from 'react';
import IntroLogo from '../../Scene/Objects/Experiencia/Intro/IntroLogo';
import useIntroStore from '../../../stores/IntroStore';

const IntroScene = () => {
  const { introVisibility } = useIntroStore();
  
  return (
    <group>
      {introVisibility && <IntroLogo />}
    </group>
  );
};

export default IntroScene;