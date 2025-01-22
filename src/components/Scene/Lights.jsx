import React from 'react';

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />
    </>
  );
};

export default Lights;