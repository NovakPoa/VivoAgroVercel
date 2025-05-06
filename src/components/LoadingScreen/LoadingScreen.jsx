import React, { useEffect, useState, useRef } from 'react';
import useAssetsStore from '../../stores/AssetsStore';
import Button from '../Commons/UI/Button/Button';
import './LoadingScreen.css';
/* import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Canvas } from '@react-three/fiber'; */

const LoadingScreen = () => {
  const { isLoading, loadingProgress, loadAllAssets, getUIImage } = useAssetsStore();
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [userStarted, setUserStarted] = useState(false);
  const requestRef = useRef(null);

  
  const displayProgress = isLoading && smoothProgress < 1 ? 1 : smoothProgress
  const loadingComplete = !isLoading && displayProgress >= 100;

  useEffect(() => {
    loadAllAssets();

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

  const handleStart = () => {
    setUserStarted(true);
  };
  
  if (userStarted) return null;
 
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <img src="/ui/icons/vivo-icon.png" alt="Vivo Agro" className="loading-logo" />       
        <h1>Vivo Agro</h1>
        
        <div className="loading-status-container">
          {loadingComplete ? (
            // Exibe o botão quando carregamento estiver completo
            <div className="start-button-container">
              <Button 
                text="Começar"
                onClick={handleStart}
                showIcon={false} 
                type="secondary"
              />
            </div>
          ) : (
            // Exibe o progresso de carregamento
            <>
              <p>Carregando...</p>
              <div className="loading-bar-container">
                <div 
                  className="loading-bar-progress" 
                  style={{ width: `${displayProgress}%` }}
                ></div>
              </div>
              <p className="loading-percentage">{Math.round(displayProgress)}%</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;