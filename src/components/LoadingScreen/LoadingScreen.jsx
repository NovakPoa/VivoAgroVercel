import React, { useEffect, useState, useRef } from 'react';
import useAssetsStore from '../../stores/AssetsStore';
import './LoadingScreen.css';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Canvas } from '@react-three/fiber';

const LoadingScreen = () => {
  const { isLoading, loadingProgress, loadAllAssets } = useAssetsStore();
  const [forceShow, setForceShow] = useState(true);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const requestRef = useRef(null);

  useEffect(() => {
    loadAllAssets();
    
    // Forçar exibição do loader
    const timer = setTimeout(() => {
      setForceShow(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    const animate = () => {
      setSmoothProgress(prev => {
        if (Math.abs(prev - loadingProgress) < 0.1) {
          return loadingProgress;
        }
        return prev + (loadingProgress - prev) * 0.08;
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [loadingProgress]);

  const displayProgress = isLoading && smoothProgress < 1 ? 1 : smoothProgress;

  if (!isLoading && !forceShow && displayProgress >= 100) return null;
 
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <img src="/icons/vivo-icon.png" alt="Vivo Agro" className="loading-logo" />
        <h1>Vivo Agro</h1>
        <p>Carregando</p>
        <div className="loading-bar-container">
          <div 
            className="loading-bar-progress" 
            style={{ width: `${displayProgress}%` }}
          ></div>
        </div>
        <p className="loading-percentage">{Math.round(displayProgress)}%</p>
      </div>
      <div style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 }}>
        <Canvas>
          <EffectComposer>
            <Bloom intensity={0.001} luminanceThreshold={1} height={64} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
};

export default LoadingScreen;