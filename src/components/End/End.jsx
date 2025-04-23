import React, { useEffect, useState, useCallback } from 'react';
import EndCard from './UI/EndCard';
import useEndStore from '../../stores/EndStore';

const End = () => {
  const { showEndCard } = useEndStore();
      
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