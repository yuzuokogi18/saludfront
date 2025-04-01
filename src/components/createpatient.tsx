import { useState, ChangeEvent, FormEvent } from "react";
import { CreatePatient } from "../patients/application/create_patients";
import { PatientRepository } from "../patients/infrastructure/PatientRepository";
import "../styles/home.css"; // Importa tu archivo de estilos

export default function CreatePatientForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    genero: "",
    numeroContacto: "", // 🔹 Ahora coincide con el name del input
  });

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
        numero_contacto: formData.numeroContacto, // 🔹 Ahora coincide con la estructura esperada
      });

      alert("Paciente creado exitosamente");

      // Reiniciar el formulario
      setFormData({ nombre: "", apellido: "", edad: "", genero: "", numeroContacto: "" });
    } catch (error) {
      console.error("Error al crear paciente", error);
      alert("Hubo un error al crear el paciente");
    }
  };

  return (
    <div className="create-user-container">
      <h2 className="title">Crear Expediente</h2>
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
      </form>
    </div>
  );
}
