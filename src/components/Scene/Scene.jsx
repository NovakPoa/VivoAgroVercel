import React, { useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import Background from './Background';
import Camera from './Camera';
import Lights from './Lights';
import Intro from '../Intro/Intro';
import Products from '../Products/Products';
import Dashboard from '../Dashboard/Dashboard';
import InteractionObjects from './Objects/Interactions/InteractionObjects';
import AnimatedObjects from './Objects/AnimatedObjects';
import BaseObjects from './Objects/BaseObjects';

const SceneContent = () => {
 
  return (
    <div className='scene-container'>
      <Canvas className="canvas">
        <Lights />
        <Camera />
        <Background />
        <InteractionObjects />
        <BaseObjects />
        <AnimatedObjects />
      </Canvas>
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