import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGesture } from '@use-gesture/react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const DraggableObject = ({ initialPosition, dropPoints, geometry, material }) => {
  const meshRef = useRef();
  const { camera } = useThree();
  const [position, setPosition] = useState(initialPosition);

  const bind = useGesture({
    onDrag: ({ offset: [x, y], memo = null }) => {
      if (!memo) {
        memo = [x, y];
      }
      const [initialX, initialY] = memo;

      // Get the direction the camera is facing
      const cameraDirection = new THREE.Vector3();
      camera.getWorldDirection(cameraDirection);

      // Calculate the right vector (perpendicular to the camera direction and up vector)
      const right = new THREE.Vector3();
      right.crossVectors(cameraDirection, camera.up).normalize();

      // Calculate the new position based on the drag offset and camera direction
      const newX = position[0] + right.x * (x - initialX) / 100;
      const newZ = position[2] + right.z * (x - initialX) / 100;
      const newY = position[1] - (y - initialY) / 100;

      setPosition([newX, newY, newZ]);

      return [x, y];
    },
    onDragEnd: () => {
      // Calculate the closest drop point
      const currentPos = new THREE.Vector3(...position);
      let closestPoint = initialPosition;
      let minDistance = currentPos.distanceTo(new THREE.Vector3(...initialPosition));

      dropPoints.forEach(point => {
        const distance = currentPos.distanceTo(new THREE.Vector3(...point));
        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = point;
        }
      });

      // Animate to the closest drop point
      gsap.to(meshRef.current.position, {
        x: closestPoint[0],
        y: closestPoint[1],
        z: closestPoint[2],
        duration: 1,
        onUpdate: () => {
          setPosition([meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z]);
        }
      });
    }
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...position);
    }
  });

  return (
    <mesh ref={meshRef} {...bind()} position={position}>
      {geometry}
      {material}
    </mesh>
  );
};

export default DraggableObject;