import React, { createContext, useState } from 'react';

export const SceneContext = createContext();

export const SceneProvider = ({ children }) => {
  const [lightColor, setLightColor] = useState('red');
  const [animate, setAnimate] = useState(false);
  const [targetPoint, setTargetPoint] = useState([0, 0, 0]);

  const toggleLightColor = () => {
    setLightColor(prevColor => (prevColor === 'red' ? 'blue' : 'red'));
  };

  const setCameraTarget = (point) => {
    setTargetPoint(point);
    setAnimate(true);
  };

  return (
    <SceneContext.Provider value={{ lightColor, animate, toggleLightColor, targetPoint, setCameraTarget }}>
      {children}
    </SceneContext.Provider>
  );
};