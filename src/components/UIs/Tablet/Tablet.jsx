import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import './tablet.css';

const Tablet = ({ images, onFinish }) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNextScreen = () => {
    if (currentScreen < images.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="tablet">
      <div className="tablet-image-wrapper">
        <img src={images[currentScreen]} alt={`Screen ${currentScreen + 1}`} className="tablet-screen" />
        <div className="tablet-button-wrapper">
          <PrimaryButton
            text={currentScreen < images.length - 1 ? 'Avançar' : 'Concluir'}
            onClick={handleNextScreen}
          />
        </div>
      </div>
    </div>
  );
};

/* Tablet.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFinish: PropTypes.func.isRequired,
}; */

export default Tablet;