import React, { useEffect } from 'react';
import Instruction from '../Instruction/Instruction';
import useInteractionStore from '../../../../stores/InteractionStore';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';
import './InstructionWithTimer.css';

const InstructionWithTimer = ({ 
  isVisible,
  title, 
  description,
  duration = 20,
  timerTitle = "Aguarde" 
}) => {
  const { 
    timerRemaining, 
    timerDuration, 
    timerActive,
    startTimer
  } = useInteractionStore();

  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(isVisible);

  useEffect(() => {
    if (isVisible && !timerActive) {
      startTimer(duration);
    }
  }, [isVisible]);
  
  if (!shouldRender) return null;

  const progressPercentage = timerDuration > 0 
    ? Math.max(0, Math.min(100, (timerRemaining / timerDuration) * 100))
    : 0;

  return (
    <div className="instruction-container">
      <Instruction 
        title={title} 
        description={description}
        isVisible={isVisible}
        onAnimationOutEnded={handleAnimationOutEnded} 
      >
        <div className="timer-section">
          <h3 className="timer-title">{timerTitle} {timerRemaining} segundos</h3>
          <div className="timer-container">
            <div className="timer-progress" style={{ width: `${progressPercentage}%` }} />
            <span className="timer-text">{timerRemaining}s</span>
          </div>
        </div>
      </Instruction>
    </div>
  );
};

export default InstructionWithTimer;