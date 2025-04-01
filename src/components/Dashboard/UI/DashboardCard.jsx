import React from 'react';
import './DashboardCard.css';
import ImageButton from '../../Commons/UI/ImageButton/ImageButton';
import { RiResetRightFill } from "react-icons/ri";
import useProductsStore from '../../../stores/ProductsStore';
import useDashboardStore from '../../../stores/DashboardStore';

const DashboardCard = () => {
  const { productsStatus, setCurrentProduct, setStartProduct } = useProductsStore();
  const { setShowDashboard } = useDashboardStore();

  const handleProductClick = (productName) => {
    setShowDashboard(false);
    setCurrentProduct(productName);
    setStartProduct(true);
  };

  return (
    <div className="dashboard-card">
      <div className="sidebar-buttons">
        <button className="sidebar-button active">
          <img src="./textures/vivo-icon-dark.png" alt="Vivo Icon" />
        </button>
        <button className="sidebar-button">
          <RiResetRightFill color="#283943" size={28} />
        </button>
      </div>
      <div className="main-buttons">
        <ImageButton status={productsStatus['agro-cobertura']} title="AGRO COBERTURA MÓVEL" onClick={() => handleProductClick('agro-cobertura')} imageUrl="/textures/agroCobertura.png" />
        <ImageButton status={productsStatus['gestao-maquinario']} title="GESTÃO DE MAQUINÁRIO" onClick={() => handleProductClick('gestao-maquinario')} imageUrl="/textures/gestaoMaquinario.jpg" />
        <ImageButton status={productsStatus['gestao-pecuaria']} title="GESTÃO PECUÁRIA" onClick={() => handleProductClick('gestao-pecuaria')} imageUrl="/textures/gestaoPecuaria.png" />
        <ImageButton status={productsStatus['clima-inteligente']} title="CLIMA INTELIGENTE" onClick={() => handleProductClick('clima-inteligente')} imageUrl="/textures/climaInteligente.jpg" />
      </div>
    </div>
  );
};

export default DashboardCard;