import React from 'react';
import './DashboardCard.css';
import ImageButton from '../UIs/ImageButton/ImageButton';
import { RiResetRightFill } from "react-icons/ri";
const DashboardCard = () => {
  return (
    <div className="dashboard-card">
      <div className="sidebar-buttons">
        <button className="sidebar-button active">
          <img src="./textures/vivo-icon-dark.png" alt="Vivo Icon" />
        </button>
        <button className="sidebar-button">
          <RiResetRightFill color="#283943" size={28}/>
        </button>
      </div>
      <div className="main-buttons">
        <ImageButton status="completed" title="AGRO COBERTURA MÓVEL" onClick="" imageUrl="/textures/agroCobertura.png" />
        <ImageButton status="unlocked" title="GESTÃO DE MAQUINÁRIO" onClick="" imageUrl="/textures/gestaoMaquinario.jpg" />
        <ImageButton status="locked" title="GESTÃO PECUÁRIA" onClick="" imageUrl="/textures/gestaoPecuaria.png" />
        <ImageButton status="locked" title="CLIMA INTELIGENTE" onClick="" imageUrl="/textures/climaInteligente.jpg" />
        <ImageButton status="locked" title="GESTÃO DE FAZENDA" onClick="" imageUrl="/textures/gestaoFazenda.jpg" />
      </div>
    </div>
  );
};

export default DashboardCard;
