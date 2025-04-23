import React, { useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import Background from './Background';
import Camera from './Camera';
import Lights from './Lights';
import Intro from '../Intro/Intro';
import End from '../End/End';
import Products from '../Products/Products';
import Dashboard from '../Dashboard/Dashboard';
import Experiencia from './Objects/Experiencia';
import Ambiente from './Objects/Ambiente';
import PostProcessing from './PostProcessing';
import Visuals from './Visuals';

const SceneContent = () => {
 
  return (
    <div className='scene-container'>
      <Canvas className="canvas">
        <Lights />
        <Camera />
        <Background />
        <Ambiente />
        <Experiencia />
        <PostProcessing /> 
        <Visuals />
      </Canvas>
      <Intro />
      <Products />  
      <Dashboard />
      <End />
    </div>
  );
};

const Scene = () => {
  return (
    <SceneContent />
  );
};

export default Scene; 