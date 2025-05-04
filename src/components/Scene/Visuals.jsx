import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';
import useAssetsStore from '../../stores/AssetsStore';

const Visuals = () => {
  const { scene } = useThree();
  const { getTexture, isLoading } = useAssetsStore();
  const hemisphereRef = useRef();
  const envMapRef = useRef();

  const envSettings = useControls('Environment', {
    envMapEnabled: { value: true, label: 'Environment Map Enabled' },
    envMapIntensity: { value: 1.0, min: 0, max: 3, step: 0.05, label: 'Intensity' },
    envMapX: { value: 0, min: 0, max: 360, step: 0.05, label: 'Env Map X Rotation' },
    envMapY: { value: 0, min: 0, max: 360, step: 0.05, label: 'Env Map Y Rotation' },
    envMapZ: { value: 0, min: 0, max: 360, step: 0.05, label: 'Env Map Z Rotation' },
    ambientLightEnabled: { value: true, label: 'Ambient Light Enabled' },
    ambientLightIntensity: { value: 1.5, min: 0, max: 2, step: 0.05, label: 'Light Intensity' },
    skyColor: { value: '#000000', label: 'Sky Color' },
    groundColor: { value: '#bce1ff', label: 'Ground Color' }
  });


  useEffect(() => {
    if (isLoading) return;

    // Configurar hemisphere light como substituto do light probe
    if (!hemisphereRef.current) {
      const hemiLight = new THREE.HemisphereLight(
        new THREE.Color(envSettings.skyColor),
        new THREE.Color(envSettings.groundColor),
        envSettings.ambientLightIntensity
      );
      scene.add(hemiLight);
      hemisphereRef.current = hemiLight;
    }

    updateVisualSettings();
  }, [isLoading]);

  // Função para atualizar configurações visuais
  const updateVisualSettings = () => {
    // Environment map
    if (envSettings.envMapEnabled) {
      const environment = getTexture('/textures/skybox/environment.jpg');
      environment.mapping = THREE.EquirectangularReflectionMapping;
      environment.colorSpace = THREE.SRGBColorSpace;
      scene.environment = environment;
      scene.environmentIntensity = envSettings.envMapIntensity;
      scene.environmentRotation = new THREE.Euler(envSettings.envMapX, envSettings.envMapY, envSettings.envMapZ);
    } else {
      scene.environment = null;
    }

    // Hemisphere light
    if (hemisphereRef.current) {
      hemisphereRef.current.visible = envSettings.ambientLightEnabled;
      hemisphereRef.current.intensity = envSettings.ambientLightIntensity;
      hemisphereRef.current.color.set(envSettings.skyColor);
      hemisphereRef.current.groundColor.set(envSettings.groundColor);
    }
  };

  // Monitorar mudanças nas configurações
  useEffect(() => {
    if (!isLoading) {
      updateVisualSettings();
    }
  }, [
    isLoading,
    envSettings.envMapEnabled,
    envSettings.envMapIntensity,
    envSettings.ambientLightEnabled,
    envSettings.ambientLightIntensity,
    envSettings.skyColor,
    envSettings.groundColor
  ]);

  return null;
};

export default Visuals;