import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';
import useAssetsStore from '../../stores/AssetsStore';

const HDR_TEXTURE_PATH = '/textures/environment.hdr'; 

const Visuals = () => {
  const { scene } = useThree();
  const { getTexture, isLoading } = useAssetsStore();
  const hemisphereRef = useRef();
  const envMapRef = useRef();
  
  const envSettings = useControls('Environment', {
    envMapEnabled: { value: true, label: 'Environment Map Enabled' },
    envMapIntensity: { value: 0.15, min: 0, max: 3, step: 0.05, label: 'Intensity' },
    ambientLightEnabled: { value: true, label: 'Ambient Light Enabled' },
    ambientLightIntensity: { value: 0.6, min: 0, max: 2, step: 0.05, label: 'Light Intensity' },
    skyColor: { value: '#FEBF71', label: 'Sky Color' },
    groundColor: { value: '#553311', label: 'Ground Color' }
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
    
    // Configurar environment map - tente HDR primeiro
    const hdriTexture = getTexture(HDR_TEXTURE_PATH);
    
    if (hdriTexture) {
      // HDR carregado com sucesso
      hdriTexture.mapping = THREE.EquirectangularReflectionMapping;
      envMapRef.current = hdriTexture;
    } else {
      // Fallback para cubemap
      const textureFiles = [
        '/textures/skybox/px.png',
        '/textures/skybox/nx.png',
        '/textures/skybox/py.png',
        '/textures/skybox/ny.png',
        '/textures/skybox/pz.png',
        '/textures/skybox/nz.png'
      ];
      
      const textures = textureFiles.map(path => getTexture(path));
      
      if (textures.every(tex => tex && tex.image)) {
        const cubeTexture = new THREE.CubeTexture();
        cubeTexture.images = textures.map(tex => tex.image);
        cubeTexture.needsUpdate = true;
        envMapRef.current = cubeTexture;
      }
    }
    
    updateVisualSettings();
  }, [isLoading]);
  
  // Função para atualizar configurações visuais
  const updateVisualSettings = () => {
    // Environment map
    if (envSettings.envMapEnabled && envMapRef.current) {
      scene.environment = envMapRef.current;
      scene.environmentIntensity = envSettings.envMapIntensity;
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