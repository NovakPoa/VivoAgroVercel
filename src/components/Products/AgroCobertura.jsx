import React from 'react';

const AgroCobertura = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="card">
      <h2>Agro Cobertura</h2>
      <p>Detalhes sobre o produto Agro Cobertura.</p>
    </div>
  );
};

export default AgroCobertura;