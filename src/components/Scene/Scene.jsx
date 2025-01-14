import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Box from '../Objects/Box';

const Scene = () => {
  const [lightColor, setLightColor] = useState('red');

  const handleClick = () => {
    setLightColor(lightColor === 'red' ? 'blue' : 'red');
  };

  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color={lightColor} position={[0, 0, 5]} />
      <Box onClick={handleClick} color={lightColor} />
    </Canvas>
  );
};

export default Scene;