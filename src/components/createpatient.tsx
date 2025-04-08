import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import { CreatePatient } from "../patients/application/create_patients";
import { PatientRepository } from "../patients/infrastructure/PatientRepository";
import "../styles/createpa.css";

export default function CreatePatientForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    genero: "",
    numeroContacto: "", 
  });

  const navigate = useNavigate();
  const patientRepository = new PatientRepository();
  const createPatientUseCase = new CreatePatient(patientRepository);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createPatientUseCase.execute({
        nombre: formData.nombre,
        apellido: formData.apellido,
        edad: Number(formData.edad),
        genero: formData.genero,
        numero_contacto: formData.numeroContacto, 
      });
      await Swal.fire({
        icon: "success",
        title: "Paciente creado exitosamente",
        html: `
          <p><strong>Nombre:</strong> ${formData.nombre}</p>
          <p><strong>Apellido:</strong> ${formData.apellido}</p>
          <p><strong>Edad:</strong> ${formData.edad}</p>
          <p><strong>Género:</strong> ${formData.genero}</p>
          <p><strong>Teléfono:</strong> ${formData.numeroContacto}</p>
        `,
        confirmButtonText: "Aceptar",
      });

      // Limpiar el formulario
      setFormData({ nombre: "", apellido: "", edad: "", genero: "", numeroContacto: "" });
    } catch (error) {
      console.error("Error al crear paciente", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al crear el paciente",
      });
    }
  };

  return (
    <div className="create-user-container">
      <h2 className="title">Crear Paciente</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <h3 className="subtitle">DATOS PERSONALES</h3>

        <label>Nombre:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

        <label>Apellido:</label>
        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />

        <label>Edad:</label>
        <input type="number" name="edad" value={formData.edad} onChange={handleChange} required />

        <label>Género:</label>
        <input type="text" name="genero" value={formData.genero} onChange={handleChange} required />

        <label>Número Tel:</label>
        <input type="text" name="numeroContacto" value={formData.numeroContacto} onChange={handleChange} required />

        <button type="submit" className="submit-button">CREAR</button>
        <button type="button" className="back-button" onClick={() => navigate(-1)}>REGRESAR</button>
      </form>
    </div>
  );
}
