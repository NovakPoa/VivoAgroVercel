import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';

const AnimateCamera = () => {
  const { camera } = useThree();

  useEffect(() => {
    gsap.to(camera.position, {
      duration: 2,
      x: 5,
      y: 5,
      z: 5,
      onUpdate: () => {
        camera.updateProjectionMatrix();
      }
    });
  }, [camera]);

  return null;
};

export default AnimateCamera;