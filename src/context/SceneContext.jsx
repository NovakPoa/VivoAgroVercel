import React, { createContext, useState, useEffect } from 'react';

export const SceneContext = createContext();

export const SceneProvider = ({ children }) => {

  const startIntroDelay = 5000;
  const showIntroCardDelay = 5000;

  const [lightColor, setLightColor] = useState('red');
  const [animate, setAnimate] = useState(false);
  const [targetPoint, setTargetPoint] = useState([0, 0, 0]);
  const [showPopup, setShowPopup] = useState(false);

  const toggleLightColor = () => {
    setLightColor(prevColor => (prevColor === 'red' ? 'blue' : 'red'));
  };

  const setCameraTarget = (point) => {
    setTargetPoint(point);
    setAnimate(true);
  };

  useEffect(() => {
    const startInteractionTimer = setTimeout(() => {
      setAnimate(true);
      const showPopupTimer = setTimeout(() => {
        setShowPopup(true);
      }, showIntroCardDelay);
      return () => clearTimeout(showPopupTimer);
    }, startIntroDelay);
    return () => clearTimeout(startInteractionTimer);
  }, []);

  return (
    <SceneContext.Provider value={{ lightColor, animate, toggleLightColor, targetPoint, setCameraTarget, showPopup, setAnimate }}>
      {children}
    </SceneContext.Provider>
  );
};