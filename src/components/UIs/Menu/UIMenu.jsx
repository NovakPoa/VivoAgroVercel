import React, { useContext, useState } from 'react';
import { SceneContext } from '../../../context/SceneContext';
import UIAgroCobertura from '../UIAgroCobertura';
import UIGestaoMaquinario from '../UIGestaoMaquinario';
import './UIMenu.css';

const UIMenu = () => {
  const { toggleLightColor, setCameraTarget } = useContext(SceneContext);
  const [selectedComponent, setSelectedComponent] = useState('AgroCobertura');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'AgroCobertura':
        return <UIAgroCobertura />;
      case 'GestaoMaquinario':
        return <UIGestaoMaquinario />;
      default:
        return <UIAgroCobertura />;
    }
  };

  return (
    <div className="ui-menu-container">
      <nav className="ui-menu-nav">
        <button onClick={() => { setSelectedComponent('AgroCobertura'); setCameraTarget([30, 0, -8]); }}>Agro Cobertura</button>
        <button onClick={() => { setSelectedComponent('GestaoMaquinario'); setCameraTarget([-30, 0, -8]); }}>Gestão de Maquinário</button>
        <button onClick={toggleLightColor}>Toggle Light Color</button>
      </nav>
      <div className="ui-component-container">
        {renderComponent()}
      </div>
    </div>
  );
};

export default UIMenu;