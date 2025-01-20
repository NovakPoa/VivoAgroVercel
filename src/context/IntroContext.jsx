import React, { createContext, useState, useEffect } from 'react';

export const IntroContext = createContext();

export const IntroProvider = ({ children }) => {
  const startIntroDelay = 5000;

  const [showIntroCard, setShowIntroCard] = useState(false);

  const startIntroTimer = () => {
    setTimeout(() => {
      //start animation e outro timer para card
      console.log('startIntroTimer');
      setShowIntroCard(true);
    }, startIntroDelay);
  };

  useEffect(() => {
    startIntroTimer();
  }, []);

  return (
    <IntroContext.Provider value={{ showIntroCard, setShowIntroCard}}>
      {children}
    </IntroContext.Provider>
  );
};