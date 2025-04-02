import React from 'react';
import IntroLogo from './AnimatedObjects/IntroLogo';
import IntroLogoFBX from './AnimatedObjects/IntroLogoFBX';
//import Tractors from './Tractors';
//import Cows from './Cows';
import useIntroStore from '../../../stores/IntroStore';

const AnimatedObjects = () => {
  const { introObjectVisible } = useIntroStore();
  
  return (
    <group>
      {introObjectVisible && <IntroLogo />}
      {introObjectVisible && <IntroLogoFBX />}
      {/* <Tractors /> */}
      {/* <Cows /> */}
    </group>
  );
};

export default AnimatedObjects;