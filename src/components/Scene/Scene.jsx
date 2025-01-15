import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import Background from './Background';
import AnimateCamera from './AnimateCamera';
import Box from '../Objects/Box';

const Scene = () => {
  const [lightColor, setLightColor] = useState('red');
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setLightColor(lightColor === 'red' ? 'blue' : 'red');
    setAnimate(true);
  };

  return (
    <div className='canvas-container'>
      <Canvas className="canvas" camera={{ position: [0, 1.7, 5] }}>
        <ambientLight intensity={0.1} />
        <directionalLight color={lightColor} position={[0, 0, 5]} />
        <Box onClick={handleClick} color={lightColor} />
        {animate && <AnimateCamera />}
        <Background />
      </Canvas>
    </div>
  );
};

export default Scene; 