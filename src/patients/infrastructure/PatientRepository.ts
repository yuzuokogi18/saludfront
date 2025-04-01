import { IPatientRepository } from "../domain/IPatientRepository";
import { Patient } from "../domain/Patient";
import { patientApi } from "./patientApi";

export class PatientRepository implements IPatientRepository {
  async getAllPatients(): Promise<Patient[]> {
    const response = await patientApi.get("/");
    return response.data.map(
      (p: any) =>
        new Patient(
          p.id_usuario,
          p.nombre,
          p.apellido,
          p.edad,
          p.genero,
          p.numero_contacto
        )
    );
  }

  async getPatientById(idUsuario: number): Promise<Patient | null> {
    const response = await patientApi.get(`/${idUsuario}`);
    return response.data
      ? new Patient(
          response.data.id_usuario,
          response.data.nombre,
          response.data.apellido,
          response.data.edad,
          response.data.genero,
          response.data.numero_contacto
        )
      : null;
  }

  async createPatient(patientData: Omit<Patient, "idUsuario">): Promise<Patient> {
    const response = await patientApi.post("/", patientData);
    console.log("Respuesta de la API en createPatient:", response.data); // 🔹 Log para depuración
    return new Patient(
      response.data.id_usuario,
      response.data.nombre,
      response.data.apellido,
      response.data.edad,
      response.data.genero,
      response.data.numero_contacto
    );
  }

  async updatePatient(
    idUsuario: number,
    updates: Partial<Omit<Patient, "idUsuario">>
  ): Promise<Patient> {
    const response = await patientApi.put(`/${idUsuario}`, updates);
    return new Patient(
      response.data.id_usuario,
      response.data.nombre,
      response.data.apellido,
      response.data.edad,
      response.data.genero,
      response.data.numero_contacto
    );
  }

  async deletePatient(idUsuario: number): Promise<void> {
    await patientApi.delete(`/${idUsuario}`);
  }
}
