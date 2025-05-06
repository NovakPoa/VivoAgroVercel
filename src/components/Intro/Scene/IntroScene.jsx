import React from 'react';
import IntroLogo from '../../Scene/Objects/Experiencia/Intro/IntroLogo';
import IntroNeon from '../../Scene/Objects/Experiencia/Intro/IntroNeon';

import useIntroStore from '../../../stores/IntroStore';

const IntroScene = () => {
  const { introLogoVisibility, introNeonVisibility } = useIntroStore();

  return (
    <group>
      {introLogoVisibility && <IntroLogo />}
      {introNeonVisibility && <IntroNeon />}
    </group>
  );
};

export default IntroScene;