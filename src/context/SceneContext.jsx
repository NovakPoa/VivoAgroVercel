import React, { createContext, useState, useEffect } from 'react';

export const SceneContext = createContext();

export const SceneProvider = ({ children }) => {

  const [animate, setAnimate] = useState(false);
  const [targetPoint, setTargetPoint] = useState([0, 0, 0]);
  const [animationDuration, setAnimationDuration] = useState(2);
  const [startAgroCobertura, setStartAgroCobertura] = useState(false);

  const setCameraTarget = ({ point, duration }) => {
    setTargetPoint(point);
    setAnimationDuration(duration);
    setAnimate(true);
  };

  return (
    <SceneContext.Provider value={{ 
        targetPoint, 
        setCameraTarget, 
        animate, 
        setAnimate, 
        animationDuration, 
        startAgroCobertura, 
        setStartAgroCobertura 
      }}>
      {children}
    </SceneContext.Provider>
  );
};