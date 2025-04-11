import React from 'react';
import TabletContent from '../../../Commons/Scene/TabletContent/TabletContent';

const AgroCoberturaTabletContent = () => {
  const tabletImages = [
    "/ui/VivoTablet1.png",
    "/ui/VivoTablet2.png",
  ];

  const handleFinish = () => {
    console.log("Usuário terminou de visualizar o carrossel de AgroCobertura");
  };

  return (
    <TabletContent images={tabletImages} onFinish={handleFinish} />
  );
};

export default AgroCoberturaTabletContent;