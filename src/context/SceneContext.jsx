import React, { createContext, useState, useEffect } from 'react';

export const SceneContext = createContext();

export const SceneProvider = ({ children }) => {

  const [lightColor, setLightColor] = useState('red');
  const [animate, setAnimate] = useState(false);
  const [targetPoint, setTargetPoint] = useState([0, 0, 0]);
  const [animationDuration, setAnimationDuration] = useState(2);
  const [showIntroCard, setShowIntroCard] = useState(false);
  const [startAgroCobertura, setStartAgroCobertura] = useState(false);

  const toggleLightColor = () => {
    setLightColor(prevColor => (prevColor === 'red' ? 'blue' : 'red'));
  };

  const setCameraTarget = ({ point, duration }) => {
    setTargetPoint(point);
    setAnimationDuration(duration);
    setAnimate(true);
  };

  return (
    <SceneContext.Provider value={{ lightColor,  toggleLightColor, targetPoint, setCameraTarget, animate, setAnimate, animationDuration, showIntroCard, setShowIntroCard, startAgroCobertura, setStartAgroCobertura }}>
      {children}
    </SceneContext.Provider>
  );
};