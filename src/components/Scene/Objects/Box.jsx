import React from 'react';

const Box = ({ onClick, color, position }) => {
  return (
    <mesh onClick={onClick} position={position} rotation={[5, 5, 3]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Box;