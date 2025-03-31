import React, { useContext } from 'react';
import { StrictMode } from 'react';
import { Canvas } from '@react-three/fiber';
import Background from './Background';
import Camera from './Camera';
import Lights from './Lights';
import Intro from '../Intro/Intro';
import Products from '../Products/Products';
import Dashboard from '../Dashboard/Dashboard';
import InteractionObjects from './Objects/InteractionObjects';
import AnimatedObjects from './Objects/AnimatedObjects';
import BaseObjects from './Objects/BaseObjects';

const SceneContent = () => {
 
  return (
    <div className='scene-container'>
      <StrictMode>
        <Canvas className="canvas" camera={{ position: [0, 1.7, 5] }}>
          <Lights />
          <Camera />
          <Background />
          <InteractionObjects />
          <BaseObjects />
          <AnimatedObjects />
        </Canvas>
      </StrictMode>
      <Intro />
      <Products />  
      <Dashboard />
    </div>
  );
};

const Scene = () => {
  return (
    <SceneContent />
  );
};

export default Scene; 