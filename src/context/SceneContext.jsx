import React, { createContext, useState, useEffect } from 'react';

export const SceneContext = createContext();

export const SceneProvider = ({ children }) => {

  const [cameraAnimate, setCameraAnimate] = useState(false);
  const [cameraTargetPoint, setTargetPoint] = useState([0, 0, 0]);
  const [cameraAnimationDuration, setCameraAnimationDuration] = useState(2);
  const [startAgroCobertura, setStartAgroCobertura] = useState(false);
  const [introObjectVisible, setIntroObjectVisible] = useState(true);
  const [introObjectAnimate, setIntroObjectAnimate] = useState(false);

  const setCameraTarget = ({ point, duration }) => {
    setTargetPoint(point);
    setCameraAnimationDuration(duration);
    setCameraAnimate(true);
  };

  return (
    <SceneContext.Provider value={{ 
        cameraTargetPoint, 
        setCameraTarget, 
        cameraAnimate, 
        setCameraAnimate, 
        cameraAnimationDuration, 
        startAgroCobertura, 
        setStartAgroCobertura ,
        introObjectVisible,
        setIntroObjectVisible,
        introObjectAnimate,
        setIntroObjectAnimate,
      }}>
      {children}
    </SceneContext.Provider>
  );
};