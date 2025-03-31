import React from 'react';

const Terrain = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#ccc" />
    </mesh>
  );
};

export default Terrain;