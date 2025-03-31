import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Tractor = ({ position, rotation, speed }) => {
  const ref = useRef();
  const { scene } = useGLTF('/models/tractor.glb');
  
  useFrame((state, delta) => {
    ref.current.position.x += Math.sin(state.clock.elapsedTime) * speed * delta;
    ref.current.position.z += Math.cos(state.clock.elapsedTime) * speed * delta;
  });

  return (
    <primitive ref={ref} object={scene.clone()} position={position} rotation={rotation} />
  );
};

const Tractors = () => {
  return (
    <group>
      <Tractor position={[10, 0, 5]} rotation={[0, Math.PI/4, 0]} speed={0.5} />
      <Tractor position={[-5, 0, 10]} rotation={[0, -Math.PI/2, 0]} speed={0.3} />
      <Tractor position={[0, 0, -15]} rotation={[0, Math.PI, 0]} speed={0.4} />
    </group>
  );
};

export default Tractors;