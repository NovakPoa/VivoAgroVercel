import React, { useState, useEffect } from 'react';
import './DashboardCard.css';
import ImageButton from '../../Commons/UI/ImageButton/ImageButton';
import { RiResetRightFill } from "react-icons/ri";
import useProductsStore from '../../../stores/ProductsStore';
import useDashboardStore from '../../../stores/DashboardStore';

const DashboardCard = ({ isVisible = true }) => {
  const { productsStatus, setCurrentProduct, setStartProduct } = useProductsStore();
  const { setShowDashboard } = useDashboardStore();
  const [animState, setAnimState] = useState('initial'); // 'initial', 'visible', 'hiding'

  useEffect(() => {
    if (isVisible) {
      const showTimer = setTimeout(() => setAnimState('visible'), 30);
      return () => clearTimeout(showTimer);
    } else if (animState === 'visible') {
      setAnimState('hiding');
    }
  }, [isVisible, animState]);

  const animClass = 
    animState === 'initial' ? 'hidden' :
    animState === 'visible' ? 'visible' : 
    'hiding';

  const handleProductClick = (productName) => {
    setShowDashboard(false);
    const timer = setTimeout(() => {
      setCurrentProduct(productName);
      setStartProduct(true);
    }, 400); // Tempo igual à duração da animação cardScaleOut (ver Card.css)       
  };

  return (
    <div className={`dashboard-card ${animClass}`}>
      <div className="sidebar-buttons">
        <button className="sidebar-button active">
          <img src="./icons/vivo-icon-dark.png" alt="Vivo Icon" />
        </button>
        <button className="sidebar-button">
          <RiResetRightFill color="#283943" size={28} />
        </button>
      </div>
      <div className="main-buttons">
        <ImageButton status={productsStatus['agro-cobertura']} title="AGRO COBERTURA MÓVEL" onClick={() => handleProductClick('agro-cobertura')} imageUrl="/ui/agroCobertura.png" />
        <ImageButton status={productsStatus['gestao-maquinario']} title="GESTÃO DE MAQUINÁRIO" onClick={() => handleProductClick('gestao-maquinario')} imageUrl="/ui/gestaoMaquinario.jpg" />
        <ImageButton status={productsStatus['gestao-pecuaria']} title="GESTÃO PECUÁRIA" onClick={() => handleProductClick('gestao-pecuaria')} imageUrl="/ui/gestaoPecuaria.png" />
        <ImageButton status={productsStatus['clima-inteligente']} title="CLIMA INTELIGENTE" onClick={() => handleProductClick('clima-inteligente')} imageUrl="/ui/climaInteligente.jpg" />
      </div>
    </div>
  );
};

export default DashboardCard;