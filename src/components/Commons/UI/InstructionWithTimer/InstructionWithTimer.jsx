import React, { useEffect, useState, useRef } from 'react';
import Instruction from '../Instruction/Instruction';
import useInteractionStore from '../../../../stores/InteractionStore';
import useComponentVisibility from '../../../../hooks/useComponentVisibility';
import './InstructionWithTimer.css';

const InstructionWithTimer = ({ 
  isVisible,
  title, 
  description,
  duration = 20
}) => {
  const { 
    timerRemaining, 
    timerDuration, 
    timerActive,
    startTimer,
    completeTimer,
    stopTimer
  } = useInteractionStore();

  const [smoothProgress, setSmoothProgress] = useState(100);
  const animationRef = useRef(null);
  const timerStartedRef = useRef(false);
  const startTimeRef = useRef(0);
  const durationRef = useRef(duration);

  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(isVisible);

  useEffect(() => {
    if (isVisible && !timerStartedRef.current) {
      startTimer(duration);
      
      timerStartedRef.current = true;
      startTimeRef.current = Date.now();
      durationRef.current = duration;
      
      // Iniciar a animação frame a frame
      requestAnimationFrame(animateProgress);
    }
    
    if (!isVisible && timerStartedRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      timerStartedRef.current = false;
      stopTimer();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, duration]);

  const animateProgress = () => {
    const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
    const remainingPercent = Math.max(0, 100 - (elapsedTime / durationRef.current) * 100);
    
    // Atualizar a largura da barra de progresso
    setSmoothProgress(remainingPercent);
    
    // Verificar se a animação terminou
    if (remainingPercent <= 0) {
      completeTimer();
      timerStartedRef.current = false;
    } else {
      animationRef.current = requestAnimationFrame(animateProgress);
    }
  };
  
  if (!shouldRender) return null;

  return (
    <div className="instruction-container">
      <Instruction 
        title={title} 
        description={description}
        isVisible={isVisible}
        onAnimationOutEnded={handleAnimationOutEnded} 
      >
        <div className="timer-section">
          <div className="timer-container">
            <div 
              className="timer-progress" 
              style={{ 
                width: `${smoothProgress}%`,
                transition: 'none'
              }} 
            />
          </div>
        </div>
      </Instruction>
    </div>
  );
};

export default InstructionWithTimer;