import React, { useEffect, useState } from 'react';
import Instruction from '../../../../Commons/UI/Instruction/Instruction';
import useInteractionStore from '../../../../../stores/InteractionStore';
import './AgroCoberturaInstructionWithTimer.css';

const AgroCoberturaInstructionWithTimer = ({ isVisible }) => {
  const { 
    timerRemaining, 
    timerDuration, 
    timerActive,
    startTimer, 
    setTimerCompleteCallback 
  } = useInteractionStore();

  useEffect(() => {
    if (isVisible && !timerActive) {
      startTimer(4);
    }
  }, [isVisible, timerActive, startTimer]);
  
  if (!isVisible) return null;

  const progressPercentage = timerDuration > 0 
    ? Math.max(0, Math.min(100, (timerRemaining / timerDuration) * 100))
    : 0;

  return (
    <div className="instruction-container">
      <Instruction 
        title="Ative o sinal da antena" 
        description="Pressione o botão para ativar o sinal de sua antena."
      >
        <div className="timer-section">
          <h3 className="timer-title">Aguarde {timerRemaining} segundos</h3>
          <div className="timer-container">
            <div className="timer-progress" style={{ width: `${progressPercentage}%` }} />
            <span className="timer-text">{timerRemaining}s</span>
          </div>
        </div>
      </Instruction>
    </div>
  );
};

export default AgroCoberturaInstructionWithTimer;