import React from "react";
import { Sidebar } from "../components/Sidebar";
import { HealthCard } from "../components/HealthCard";

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <h1>Monitor de Salud Personal</h1>
        <p>Seguimiento de tus signos vitales</p>

        {/* Indicadores de estados */}
        <div className="status-indicators">
          <div className="status optimo">
            <span></span> Estado Óptimo
          </div>
          <div className="status alerta">
            <span></span> Estado de Alerta
          </div>
          <div className="status critico">
            <span></span> Estado Crítico
          </div>
        </div>

        {/* Tarjetas de información */}
        <div className="health-grid">
          <HealthCard title="Peso" value="87 KG" status="alerta" description="Sobrepeso!!" />
          <HealthCard title="Altura" value="1.55 CM" status="optimo" description="Altura Adecuada" />
          <HealthCard title="Ritmo Cardiaco" value="87" status="alerta" description="Ritmo cardíaco es irregular" />
          <HealthCard title="Temperatura" value="36.8°C" status="critico" description="Temperatura corporal en nivel crítico" />
        </div>
      </div>
    </div>
  );
};
