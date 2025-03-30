import { useState, ChangeEvent, FormEvent } from "react";
import { CreatePatient } from "../patients/application/create_patients";
import { PatientRepository } from "../patients/infrastructure/PatientRepository";

export default function CreatePatientForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    genero: "",
    numeroContacto: "",
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
        numeroContacto: formData.numeroContacto,
      });
      alert("Paciente creado exitosamente");
      setFormData({ nombre: "", apellido: "", edad: "", genero: "", numeroContacto: "" });
    } catch (error) {
      console.error("Error al crear paciente", error);
      alert("Hubo un error al crear el paciente");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      <h2>Crear Expediente</h2>
      <div style={{ border: "1px solid #ccc", padding: "20px", display: "inline-block" }}>
        <h3>DATOS PERSONALES</h3>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        <br />
        <label>Apellido:</label>
        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
        <br />
        <label>Edad:</label>
        <input type="number" name="edad" value={formData.edad} onChange={handleChange} required />
        <br />
        <label>Género:</label>
        <input type="text" name="genero" value={formData.genero} onChange={handleChange} required />
        <br />
        <label>Número Tel:</label>
        <input type="text" name="numeroContacto" value={formData.numeroContacto} onChange={handleChange} required />
        <br />
        <button type="submit" style={{ marginTop: "10px", padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none" }}>
          CREAR
        </button>
      </div>
    </form>
  );
}
