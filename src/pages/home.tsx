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
          <HealthCard title="Peso" value="72 KG" status="alerta" description="Peso ligeramente elevado" />
          <HealthCard title="Altura" value="163 CM" status="optimo" description="Estatura normal" />
          <HealthCard title="Ritmo Cardiaco" value="85 BPM" status="alerta" description="Ritmo ligeramente acelerado" />
          <HealthCard title="Temperatura" value="31.5°C" status="optimo" description="temperatura normal" />
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
