import { create } from 'zustand';

let timerInterval = null;

const interactionStore = (set, get) => ({
  timerActive: false,
  timerDuration: 10,
  timerRemaining: 0,
  
  showInteraction: false,
  setShowInteraction: (value) => set({ showInteraction: value }),

  showFirstInteraction: false,
  showSecondInteraction: false,
  setShowFirstInteraction: (value) => set({ showFirstInteraction: value }),
  setShowSecondInteraction: (value) => set({ showSecondInteraction: value }),  
  
  showFirstInstruction: false,
  showSecondInstruction: false,
  setShowFirstInstruction: (show) => set({ showFirstInstruction: show }),
  setShowSecondInstruction: (show) => set({ showSecondInstruction: show }), 

  startTimer: (duration = 10) => {
    // Limpar timer anterior se existir
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    set({ 
      timerActive: true, 
      timerDuration: duration, 
      timerRemaining: duration
    });
    
    timerInterval = setInterval(() => {
      const state = get();
      
      if (state.timerRemaining <= 1) {
        // Timer acabou, limpar intervalo e disparar evento de finalização
        clearInterval(timerInterval);
        timerInterval = null;
        set({ timerRemaining: 0 });
        
        const { completeTimer } = get();
        completeTimer();
      } else {
        set({ timerRemaining: state.timerRemaining - 1 });
      }
    }, 1000);
  },
  
  updateTimerRemaining: (remaining) => {
    set({ timerRemaining: remaining });
  },
  
  stopTimer: () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    
    set({ 
      timerActive: false, 
      timerRemaining: 0
    });
  },
  
  onTimerComplete: null,
  
  setTimerCompleteCallback: (callback) => {
    set({ onTimerComplete: typeof callback === 'function' ? callback : null });
  },
  
  completeTimer: () => {
    const { onTimerComplete } = get();    
    if (onTimerComplete) {
      onTimerComplete();
    }
    
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    
    set({ 
      timerActive: false,
      timerRemaining: 0
    });
  }, 
});

const useInteractionStore = create(interactionStore);

export default useInteractionStore;