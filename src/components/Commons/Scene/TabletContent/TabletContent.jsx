import React, { useState, useCallback } from 'react';
import Button from '../../UI/Button/Button';
import './TabletContent.css';

const TabletContent = ({ images, onFinish }) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNextScreen = useCallback(() => {
    if (currentScreen < images.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onFinish();
    }
  }, [currentScreen, images]);

  return (
    <div className="tablet">
      <div className="tablet-image-wrapper">
        <img src={images[currentScreen]} alt={`Screen ${currentScreen + 1}`} className="tablet-screen" />
        <div className="tablet-button-wrapper">
          <Button
            text={currentScreen < images.length - 1 ? 'Avançar' : 'Concluir'}
            onClick={handleNextScreen}
            showIcon={currentScreen >= images.length - 1}
            iconUrl="./ui/icons/check-icon.png"
            type="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default TabletContent;