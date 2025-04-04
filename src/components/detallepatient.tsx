import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PatientRepository } from "../patients/infrastructure/PatientRepository";
import { CaseRepository } from "../cases/infrastructure/CaseRepository";
import { Patient } from "../patients/domain/Patient"
import "../styles/historial.css";
import { Case } from "../cases/domain/Case";

const patientRepository = new PatientRepository();
const caseRepository = new CaseRepository();

const DetallePaciente: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [patientCase, setPatientCase] = useState<Case | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const patientData = await patientRepository.getPatientById(Number(id));
      setPatient(patientData);
    };

    const fetchCase = async () => {
      if (!id) return;
      const caseData = await caseRepository.getCaseById(id);
      setPatientCase(caseData);
    };

    fetchPatient();
    fetchCase();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!patient || !patientCase) return <p>Cargando...</p>;

  return (
    <div className="detalle-container">
      <h2>{`${patient.nombre} ${patient.apellido}`}</h2>
      <p>Edad: {patient.edad}</p>
      <p>Género: {patient.genero}</p>
      <p>Contacto: {patient.numero_contacto}</p>

      <h3>Signos Vitales</h3>
      <p>Temperatura: {patientCase.temperatura}°C</p>
      <p>Peso: {patientCase.peso} kg</p>
      <p>Estatura: {patientCase.estatura} m</p>
      <p>Ritmo Cardíaco: {patientCase.ritmoCardiaco} bpm</p>

      <button onClick={handlePrint}>Imprimir PDF</button>
    </div>
  );
};

export default DetallePaciente;
