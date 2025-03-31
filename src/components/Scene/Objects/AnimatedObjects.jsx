import React from 'react';
import IntroObject from './AnimatedObjects/IntroObject';
//import Tractors from './Tractors';
//import Cows from './Cows';
import useIntroStore from '../../../stores/IntroStore';

const AnimatedObjects = () => {
  const { introObjectVisible } = useIntroStore();
  
  return (
    <group>
      {introObjectVisible && <IntroObject />}
      {/* <Tractors /> */}
      {/* <Cows /> */}
    </group>
  );
};

export default AnimatedObjects;