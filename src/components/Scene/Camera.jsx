import { useEffect, useContext, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import { SceneContext } from '../../context/SceneContext';

const Camera = () => {
  const { camera, gl } = useThree();
  const { targetPoint, animate, setAnimate, animationDuration } = useContext(SceneContext);
  const controlsRef = useRef();

  useEffect(() => {
    if (animate) {
      const target = { x: targetPoint[0], y: targetPoint[1], z: targetPoint[2] };

      gsap.to(controlsRef.current.target, {
        duration: animationDuration,
        x: target.x,
        y: target.y,
        z: target.z,
        onUpdate: () => {
          controlsRef.current.update();
        },
        onComplete: () => {
          setAnimate(false);
        }
      });
    }
  }, [animate, targetPoint, setAnimate]);

  return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
};

export default Camera;