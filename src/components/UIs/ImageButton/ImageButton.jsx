import React from 'react';
import './ImageButton.css';
import { RiLock2Fill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";

const ImageButton = ({ imageUrl, title, status, onClick }) => {
  return (
    <div
      className={`image-button ${status}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={onClick}
    >
      {status === 'locked' && (
        <div className="overlay locked-overlay">
          <RiLock2Fill color="#fff" className="icon center-icon" />
        </div>
      )}
      {status === 'completed' && (
        <FaCheck color="#007D1E" className="icon check-icon"/>
      )}
      <div className="title">{title}</div>
    </div>
  );
};

export default ImageButton;