import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { HealthCard } from "../components/HealthCard";
import { getAllCases } from "../cases/application/get_all_case";
import { Case } from "../cases/domain/Case";
import { GetAllPatients } from "../patients/application/get_all_patients";
import { Patient } from "../patients/domain/Patient";
import { PatientRepository } from "../patients/infrastructure/PatientRepository";
import { CaseRepository } from "../cases/infrastructure/CaseRepository";
import "../styles/home.css";

export const Dashboard: React.FC = () => {
  const [patientData, setPatientData] = useState<Case | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  const patientRepository = new PatientRepository();
  const caseRepository = new CaseRepository();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const cases = await getAllCases();
        if (cases.length > 0) {
          setPatientData(cases[cases.length - 1]);
        }
      } catch (error) {
        console.error("Error obteniendo datos del paciente", error);
      }
    };

    fetchPatientData();
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const getAllPatients = new GetAllPatients(patientRepository);
        const allPatients = await getAllPatients.execute();
        setPatients(allPatients);
      } catch (error) {
        console.error("Error obteniendo pacientes", error);
      }
    };

    fetchPatients();
  }, []);

  const handleSave = async () => {
    if (!selectedPatientId || !patientData) return;

    const payload = new Case(
      0,
      selectedPatientId,
      patientData.temperatura,
      patientData.peso,
      patientData.estatura,
      patientData.ritmoCardiaco,
      new Date()
    );

    try {
      await caseRepository.createCase(payload);
      alert("Signos vitales guardados correctamente.");
    } catch (error) {
      console.error("Error guardando los datos del paciente:", error);
      alert("Hubo un error al guardar los signos vitales.");
    }
  };

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

<div className="patient-selection">
  <label htmlFor="patient-select">Paciente:</label>
  <select
    id="patient-select"
    value={selectedPatientId ?? ''}
    onChange={(e) => setSelectedPatientId(Number(e.target.value))}
  >
    <option value="">-- Selecciona --</option>
    {patients.map((patient) => (
      <option key={patient.idUsuario} value={patient.idUsuario}>
        {patient.nombre} {patient.apellido}
      </option>
    ))}
  </select>

  <button
    onClick={handleSave}
    disabled={!selectedPatientId || !patientData}
  >
    Guardar
  </button>
</div>

      </div>
    </div>
  );
};
