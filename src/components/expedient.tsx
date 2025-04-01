import React, { useEffect, useState } from "react";
import { Patient } from "../patients/domain/Patient";
import { GetAllPatients } from "../patients/application/get_all_patients";
import { PatientRepository } from "../patients/infrastructure/PatientRepository";
import { Case } from "../cases/domain/Case";
import { CaseRepository } from "../cases/infrastructure/CaseRepository";
import jsPDF from "jspdf";
import "../styles/home.css";

const PatientVitals: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientRepository = new PatientRepository();
        const patientsService = new GetAllPatients(patientRepository);
        const patientsData = await patientsService.execute();

        if (patientsData.length > 0) {
          setPatient(patientsData[patientsData.length - 1]);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    const fetchCaseData = async () => {
      try {
        const caseRepository = new CaseRepository();
        const cases = await caseRepository.getAllCases();
        setCaseData(cases.length > 0 ? cases[0] : null);
      } catch (error) {
        console.error("Error fetching case data:", error);
      }
    };

    fetchPatient();
    fetchCaseData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (patient) {
      setPatient({
        ...patient,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = async () => {
    if (patient) {
      try {
        console.log("Datos enviados al actualizar paciente:", {
          nombre: patient.nombre,
          apellido: patient.apellido,
          edad: Number(patient.edad),
          numero_contacto: patient.numero_contacto,
        });

        const patientRepository = new PatientRepository();
        await patientRepository.updatePatient(patient.idUsuario, {
          nombre: patient.nombre,
          apellido: patient.apellido,
          edad: Number(patient.edad),
          numero_contacto: patient.numero_contacto,
        });

        setIsEditing(false);
      } catch (error) {
        console.error("Error updating patient data:", error);
        if (error.response) {
          console.error("Respuesta del servidor:", error.response.data);
        }
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Expediente del Paciente", 10, 10);

    if (patient) {
      doc.setFontSize(14);
      doc.text(`Nombre: ${patient.nombre}`, 10, 20);
      doc.text(`Apellido: ${patient.apellido}`, 10, 30);
      doc.text(`Edad: ${patient.edad}`, 10, 40);
      doc.text(`Número de Contacto: ${patient.numero_contacto}`, 10, 50);
    }

    if (caseData) {
      doc.text(`Temperatura: ${caseData.temperatura} °C`, 10, 60);
      doc.text(`Peso: ${caseData.peso} KG`, 10, 70);
      doc.text(`Altura: ${caseData.estatura} CM`, 10, 80);
      doc.text(`Ritmo Cardíaco: ${caseData.ritmoCardiaco} BPM`, 10, 90);
    }

    doc.save("expediente_paciente.pdf");
  };

  return (
    <>
      <h1 className="title-centered">
        <img src="/assets/expedient.png" alt="Icono" className="title-icon" />
        EXPEDIENTE
      </h1>
      {patient && (
        <div className="patient-info-container">
          <div className="patient-form-container">
            <h2>DATOS PERSONALES</h2>
            <label>NOMBRE:</label>
            <input
              type="text"
              name="nombre"
              value={patient.nombre}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
            <label>APELLIDO:</label>
            <input
              type="text"
              name="apellido"
              value={patient.apellido}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
            <label>EDAD:</label>
            <input
              type="number"
              name="edad"
              value={patient.edad}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
            <label>NUM TEL:</label>
            <input
              type="text"
              name="numero_contacto"
              value={patient.numero_contacto}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
            <button
              className="edit-btn"
              onClick={isEditing ? handleSave : handleEditClick}
            >
              {isEditing ? "GUARDAR" : "EDITAR"}
            </button>
          </div>

          <div className="vital-cards">
            <h2>SIGNOS VITALES</h2>
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

          <button className="pdf-btn" onClick={generatePDF}>Generar PDF</button>
        </div>
      )}
    </>
  );
};

export default PatientVitals;
