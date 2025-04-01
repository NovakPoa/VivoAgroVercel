import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import useIntroStore from '../../../../stores/IntroStore';

const IntroObject = () => {
  const meshRef = useRef();
  const { introObjectAnimate, setIntroObjectAnimate } = useIntroStore();

  const target = { x: -5, y: 2, z: -15 };
  const duration = 2; 

  useEffect(() => {
    if (introObjectAnimate) {
      gsap.to(meshRef.current.position, {
        duration: duration,
        x: target.x,
        y: target.y,
        z: target.z,
        onComplete: () => {
          setIntroObjectAnimate(false);
        }
      });
    }
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, -20]} rotation={[5, 5, 3]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={'green'} />
    </mesh>
  );
};

export default IntroObject;