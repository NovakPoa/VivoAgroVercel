import React, { useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import Background from './Background';
import Camera from './Camera';
import UIMenu from '../UIs/Menu/UIMenu';
import Box from '../Objects/Box';
import { SceneContext, SceneProvider } from '../../context/SceneContext';

const SceneContent = () => {
  const { lightColor } = useContext(SceneContext);

  return (
    <div className='canvas-container'>
      <Canvas className="canvas" camera={{ position: [0, 1.7, 5] }}>
        <ambientLight intensity={0.1} />
        <directionalLight color={lightColor} position={[0, 0, 5]} />
        <Box color={lightColor} position={[0, 0, -20]}/>
        <Box color={lightColor} position={[30, 0, -8]}/>
        <Box color={lightColor} position={[-30, 0, -8]}/>
        <Box color={lightColor} position={[30, 0, 8]}/>
        <Box color={lightColor} position={[-30, 0, 8]}/>   
        <Box color={lightColor} position={[0, 0, 20]}/>     
        <Camera />
        <Background />
      </Canvas>
      <UIMenu />
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