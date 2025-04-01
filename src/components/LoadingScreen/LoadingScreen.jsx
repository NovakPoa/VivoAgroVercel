import React, { useEffect } from 'react';
import useAssetsStore from '../../stores/AssetsStore';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const { isLoading, loadingProgress, loadAllAssets } = useAssetsStore();

  useEffect(() => {
    loadAllAssets();
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <img src="/textures/vivo-icon.png" alt="Vivo Agro" className="loading-logo" />
        <h1>Vivo Agro</h1>
        <p>Carregando</p>
        <div className="loading-bar-container">
          <div 
            className="loading-bar-progress" 
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <p className="loading-percentage">{Math.round(loadingProgress)}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;