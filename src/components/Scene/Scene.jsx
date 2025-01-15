import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Background from './Background';
import Box from '../Objects/Box';

const Scene = () => {
  const [lightColor, setLightColor] = useState('red');

  const handleClick = () => {
    setLightColor(lightColor === 'red' ? 'blue' : 'red');
  };

  return (
    <div className='canvas-container'>
      <Canvas className="canvas" >
        <ambientLight intensity={0.1} />
        <directionalLight color={lightColor} position={[0, 0, 5]} />
        <Background />
      </Canvas>
    </div>
  );
};

export default Scene;