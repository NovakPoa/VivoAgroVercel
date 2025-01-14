import React from 'react';

const Box = ({ onClick, color }) => {
  return (
    <mesh onClick={onClick}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Box;