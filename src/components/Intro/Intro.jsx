import React, { useContext } from 'react';
import IntroCard from '../Intro/IntroCard';
import { IntroContext } from '../../context/IntroContext';

const Intro = () => {
  const { showIntroCard } = useContext(IntroContext);

  return (
    <div className="intro-container">
      <IntroCard isVisible={showIntroCard} />
    </div>
  );
};

export default Intro;