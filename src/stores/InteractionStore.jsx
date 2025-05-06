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
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    
    const startTime = Date.now();
    const durationMs = duration * 1000;
    
    set({ 
      timerActive: true, 
      timerDuration: duration, 
      timerRemaining: duration
    });
    
    timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, durationMs - elapsed) / 1000;
      
      if (remaining <= 0) {

        clearInterval(timerInterval);
        timerInterval = null;
        set({ timerRemaining: 0 });
  
      } else {
        set({ timerRemaining: remaining });
      }
    }, 100);
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