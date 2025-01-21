import { useEffect, useContext, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import { SceneContext } from '../../context/SceneContext';

const Camera = () => {
  const { camera, gl } = useThree();
  const { cameraTargetPoint, cameraAnimate, setCameraAnimate, cameraAnimationDuration } = useContext(SceneContext);
  const controlsRef = useRef();

  useEffect(() => {
    if (cameraAnimate) {
      const target = { x: cameraTargetPoint[0], y: cameraTargetPoint[1], z: cameraTargetPoint[2] };

      gsap.to(controlsRef.current.target, {
        duration: cameraAnimationDuration,
        x: target.x,
        y: target.y,
        z: target.z,
        onUpdate: () => {
          controlsRef.current.update();
        },
        onComplete: () => {
          setCameraAnimate(false);
        }
      });
    }
  }, [cameraAnimate, cameraTargetPoint, setCameraAnimate]);

  return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
};

export default Camera;