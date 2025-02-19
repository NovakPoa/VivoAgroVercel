import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';

const AgroCoberturaObject2 = () => {
  const meshRef = useRef();

  const bind = useDrag(({ offset: [x, y] }) => {
    meshRef.current.position.x = x / 100;
    meshRef.current.position.y = -y / 100;
  });

  useFrame(() => {
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} {...bind()} position={[0, 0, -5]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={'green'} />
    </mesh>
  );
};

export default AgroCoberturaObject2;