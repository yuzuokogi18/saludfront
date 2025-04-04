import React, { useState, useEffect } from "react";
import { GetAllPatients } from "../patients/application/get_all_patients";
import { PatientRepository } from "../patients/infrastructure/PatientRepository";
import { Patient } from "../patients/domain/Patient";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf"; // Importamos jsPDF
import "../styles/historial.css";

const patientRepository = new PatientRepository();
const getAllPatients = new GetAllPatients(patientRepository);

const Historial: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatients.execute();
        setPatients(data);
      } catch (error) {
        console.error("Error al obtener pacientes:", error);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    `${patient.nombre} ${patient.apellido}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleViewMore = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleGeneratePDF = () => {
    if (selectedPatient) {
      const doc = new jsPDF();

      // Agregamos el título
      doc.setFontSize(18);
      doc.text("Información del Paciente", 20, 20);

      // Agregamos la información del paciente
      doc.setFontSize(12);
      doc.text(`Nombre: ${selectedPatient.nombre} ${selectedPatient.apellido}`, 20, 30);
      doc.text(`Edad: ${selectedPatient.edad}`, 20, 40);
      doc.text(`Género: ${selectedPatient.genero}`, 20, 50);
      doc.text(`Contacto: ${selectedPatient.numero_contacto}`, 20, 60);

      // Agregar signos vitales (puedes actualizarlos según corresponda)
      doc.text(`Temperatura: 36.5°C`, 20, 70);
      doc.text(`Peso: 70kg`, 20, 80);
      doc.text(`Estatura: 1.75m`, 20, 90);
      doc.text(`Ritmo cardiaco: 72bpm`, 20, 100);

      // Generamos el PDF
      doc.save(`informacion_paciente_${selectedPatient.idUsuario}.pdf`);
    }
  };
  return (
    <div className="historial-containers">
      <h1 className="title-centereds">
        Historial del Paciente
      </h1>
  
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>🔍</button>
      </div>
  
      <div className="patient-list">
        {filteredPatients.map((patient) => (
          <div key={patient.idUsuario} className="patient-card">
            <h3>{`${patient.nombre} ${patient.apellido}`}</h3>
            <button onClick={() => handleViewMore(patient)}>Ver Más</button>
          </div>
        ))}
      </div>
  
      {showModal && selectedPatient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedPatient.nombre} {selectedPatient.apellido}</h2>
            <p><strong>Edad:</strong> {selectedPatient.edad}</p>
            <p><strong>Género:</strong> {selectedPatient.genero}</p>
            <p><strong>Contacto:</strong> {selectedPatient.numero_contacto}</p>
  
            {/* Aquí puedes poner los signos vitales reales, por ahora son estáticos */}
            <p><strong>Temperatura:</strong> 36.5°C</p>
            <p><strong>Peso:</strong> 70kg</p>
            <p><strong>Estatura:</strong> 1.75m</p>
            <p><strong>Ritmo cardiaco:</strong> 72bpm</p>
  
            <div className="modal-buttons">
              <button onClick={handleGeneratePDF}>📄 Generar PDF</button>
              <button onClick={() => navigate(`/historial/${selectedPatient.idUsuario}`)}>📁 Ver Historial</button>
              <button onClick={() => setShowModal(false)}>❌ Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Historial;
