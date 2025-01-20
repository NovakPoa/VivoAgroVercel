import React from 'react';

const GestaoMaquinario = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="card">
      <h2>Gestão de Maquinário</h2>
      <p>Detalhes sobre o produto Gestão de Maquinário.</p>
    </div>
  );
};

export default GestaoMaquinario;