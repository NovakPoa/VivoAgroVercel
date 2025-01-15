import React from 'react';
import PropTypes from 'prop-types';
import './UiComponent.css';

const UIComponent = ({ title, imageUrl, description, link }) => {
  return (
    <div className="card">
    <div
        className="card-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
    <div className="card-content">
        <h1>{title}</h1>
        <p>{description}</p>
        <a href={link} className="card-button">
            Iniciar
        </a>
    </div>
    </div> 
  );
};

UIComponent.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default UIComponent;