import React, { useEffect, useState } from "react";
import { Patient } from "../patients/domain/Patient";
import { GetAllPatients } from "../patients/application/get_all_patients";
import { PatientRepository } from "../patients/infrastructure/PatientRepository";
import { Case } from "../cases/domain/Case";
import { CaseRepository } from "../cases/infrastructure/CaseRepository";
import "../styles/home.css";

const PatientVitals: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [caseData, setCaseData] = useState<Case | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientRepository = new PatientRepository();
        const patientsService = new GetAllPatients(patientRepository);
        const patientsData = await patientsService.execute();
        setPatient(patientsData[0]);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    const fetchCaseData = async () => {
      try {
        const caseRepository = new CaseRepository();
        const cases = await caseRepository.getAllCases();
        setCaseData(cases[0]);
      } catch (error) {
        console.error("Error fetching case data:", error);
      }
    };

    fetchPatient();
    fetchCaseData();
  }, []);

  return (
    <div className="patient-container">
      <h2>DATOS PERSONALES</h2>
      {patient && (
        <>
          <label>NOMBRE:</label>
          <input type="text" value={patient.nombre} readOnly />

          <label>APELLIDO:</label>
          <input type="text" value={patient.apellido} readOnly />

          <label>EDAD:</label>
          <input type="text" value={`${patient.edad} AÑOS`} readOnly />

          <label>NUM TEL:</label>
          <input type="text" value={patient.numeroContacto} readOnly />
        </>
      )}
      <button className="edit-btn">EDITAR</button>
      
      <h2>SIGNOS VITALES</h2>
      <div className="vital-cards">
        {caseData && (
          <>
            <div className="vital-card">
              <h3>TEMPERATURA</h3>
              <p>{caseData.temperatura} °C</p>
            </div>
            <div className="vital-card">
              <h3>PESO</h3>
              <p>{caseData.peso} KG</p>
            </div>
            <div className="vital-card">
              <h3>ALTURA</h3>
              <p>{caseData.estatura} CM</p>
            </div>
            <div className="vital-card">
              <h3>RITMO CARDIACO</h3>
              <p>{caseData.ritmoCardiaco} BPM</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientVitals;
