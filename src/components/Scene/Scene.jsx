import React, { useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import Background from './Background';
import Camera from './Camera';
import UIMenu from '../UIs/Menu/UIMenu';
import Box from '../Objects/Box';
import Intro from '../Intro/Intro';
import Products from '../Products/Products';
import { SceneContext, SceneProvider } from '../../context/SceneContext';


const SceneContent = () => {
  const { lightColor } = useContext(SceneContext);

  return (
    <div className='scene-container'>
      <Canvas className="canvas" camera={{ position: [0, 1.7, 5] }}>
        <ambientLight intensity={0.1} />
        <directionalLight color={lightColor} position={[0, 0, 5]} />
        <Box color={lightColor} position={[0, 0, -20]}/>
{/*         <Box color={lightColor} position={[30, 0, -8]}/>
        <Box color={lightColor} position={[-30, 0, -8]}/>
        <Box color={lightColor} position={[30, 0, 8]}/>
        <Box color={lightColor} position={[-30, 0, 8]}/>   
        <Box color={lightColor} position={[0, 0, 20]}/>    */}  
        <Camera />
        <Background />
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