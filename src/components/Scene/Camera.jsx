import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import useCameraStore from '../../stores/CameraStore';

const Camera = () => {
  const { camera, gl } = useThree();
  const { cameraTargetPoint, cameraAnimate, animationDuration, setCameraAnimate } = useCameraStore();
  const controlsRef = useRef();

  useEffect(() => {
    if (cameraAnimate) {
      const target = { x: cameraTargetPoint[0], y: cameraTargetPoint[1], z: cameraTargetPoint[2] };

      const onComplete = () => {
        setCameraAnimate({ animate: false, point: cameraTargetPoint });
      };

      gsap.to(controlsRef.current.target, {
        duration: animationDuration,
        x: target.x,
        y: target.y,
        z: target.z,
        onUpdate: () => {
          controlsRef.current.update();
        },
        onComplete: onComplete,
      });
    }
  }, [cameraAnimate, cameraTargetPoint, setCameraAnimate]);

  return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} enablePan={false} enableRotate={false} enableZoom={false} />;
};

export default Camera;