import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { HealthCard } from "../components/HealthCard";
import { getAllCases } from "../cases/application/get_all_case";
import { Case } from "../cases/domain/Case";
import "../styles/home.css";

export const Dashboard: React.FC = () => {
  const [patientData, setPatientData] = useState<Case | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const cases = await getAllCases();
        if (cases.length > 0) {
          setPatientData(cases[cases.length - 1]); // Último caso registrado
        }
      } catch (error) {
        console.error("Error obteniendo datos del paciente", error);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <h1>Monitor de Salud Personal</h1>
        <p>Seguimiento de tus signos vitales</p>

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
          {patientData ? (
            <>
              <HealthCard title="Peso" value={`${patientData.peso} KG`} status="alerta" description="Peso registrado" />
              <HealthCard title="Altura" value={`${patientData.estatura} CM`} status="optimo" description="Altura registrada" />
              <HealthCard title="Ritmo Cardiaco" value={`${patientData.ritmoCardiaco} BPM`} status="alerta" description="Ritmo cardíaco actual" />
              <HealthCard title="Temperatura" value={`${patientData.temperatura}°C`} status="critico" description="Temperatura corporal" />
            </>
          ) : (
            <p>Cargando datos del paciente...</p>
          )}
        </div>
      </div>
    </div>
  );
};
