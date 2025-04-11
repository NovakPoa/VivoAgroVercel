import { useState, useEffect } from 'react';

const useComponentVisibility = (isVisible, exitDuration = 400) => { // Tempo igual à duração da animação cardScaleOut (ver Card.css) 
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } 
    else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, exitDuration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, exitDuration]);

  return shouldRender;
};

export default useComponentVisibility;