import React, { useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import Background from './Background';
import Camera from './Camera';
import Lights from './Lights';
import AnimatedObjects from './Objects/AnimatedObjects/AnimatedObjects';
import Intro from '../Intro/Intro';
import Products from '../Products/Products';
import DashboardCard from '../Dashboard/DashboardCard';
import EndCard from '../End/EndCard';

const SceneContent = () => {
  return (
    <div className='scene-container'>
      <Canvas className="canvas" camera={{ position: [0, 1.7, 5] }}>
        <Lights />
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
    <SceneContent />
  );
};

export default Scene; 