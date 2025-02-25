import React, { useRef, useEffect, useContext, useState } from 'react';
import { gsap } from 'gsap';
import useIntroStore from '../../../../../stores/IntroStore';

const IntroObject = () => {
  const meshRef = useRef();
  const { introObjectVisible, introObjectAnimate, setIntroObjectAnimate } = useIntroStore();

  const target = { x: -5, y: 2, z: -15 };
  const duration = 2; 

  useEffect(() => {
    if (introObjectAnimate) {
      gsap.to(meshRef.current.position, {
        duration: duration,
        x: target.x,
        y: target.y,
        z: target.z,
        onUpdate: () => {
          meshRef.current.updateMatrix();
        },
        onComplete: () => {
          setIntroObjectAnimate(false);
        }
      });
    }
  }, [introObjectAnimate, setIntroObjectAnimate]);

  if (!introObjectVisible) return null 

  return (
    <mesh ref={meshRef} position={[0, 0, -20]} rotation={[5, 5, 3]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={'green'} />
    </mesh>
  );
};

export default IntroObject;