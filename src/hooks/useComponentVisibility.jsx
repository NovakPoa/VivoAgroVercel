import { useState, useEffect, useRef, useCallback } from 'react';

const useComponentVisibility = (isVisible) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const animationEndedRef = useRef(false);
  
  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      animationEndedRef.current = false;
    }
  }, [isVisible]);

  const handleAnimationOutEnded = useCallback(() => {
    if (!animationEndedRef.current && !isVisible) {
      console.log('animationEndedRef.current', animationEndedRef.current);
      animationEndedRef.current = true;
      setShouldRender(false);
      console.log('animationEndedRef.current', animationEndedRef.current);
    }
  }, [isVisible]);
  
  //const isAnimationOutEnded = useCallback(() => animationEndedRef.current, []);

  return [shouldRender, handleAnimationOutEnded];
};

export default useComponentVisibility;