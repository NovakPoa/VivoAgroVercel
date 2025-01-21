import React, { useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import Background from './Background';
import Camera from './Camera';
import AnimatedObjects from './Objects/AnimatedObjects/AnimatedObjects';
import Intro from '../Intro/Intro';
import Products from '../Products/Products';
import { SceneProvider } from '../../context/SceneContext';

const SceneContent = () => {
  return (
    <div className='scene-container'>
      <Canvas className="canvas" camera={{ position: [0, 1.7, 5] }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} />
        <Camera />
        <Background />
        <AnimatedObjects />
      </Canvas>
      <Intro />
      <Products />
    </div>
  );
};

const Scene = () => {
  return (
    <SceneProvider>
      <SceneContent />
    </SceneProvider>
  );
};

export default Scene; 