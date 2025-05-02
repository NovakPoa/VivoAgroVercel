import React, { useEffect, useState, useCallback } from 'react';
import EndCard from './UI/EndCard';
import useEndStore from '../../stores/EndStore';
import useSoundStore from '../../stores/SoundStore';

const End = () => {
  const { showEndCard } = useEndStore();
  const { playSound } = useSoundStore();

  useEffect(() => {
    if (showEndCard) {
      playSound('ENDING', { 
        volume: 0.8 
      });
    }
  }, [showEndCard, playSound]);

  const onButtonClick = useCallback(() => {
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }, []);
  
  return (
    <div className="end-container">
      <EndCard isVisible={showEndCard} onContinueClick={onButtonClick} />
    </div>
  );
};

export default End;