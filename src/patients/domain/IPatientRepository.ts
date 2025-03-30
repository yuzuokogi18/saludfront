import { Patient } from "./Patient";

export interface IPatientRepository {
  getAllPatients(): Promise<Patient[]>;
  getPatientById(idUsuario: number): Promise<Patient | null>;
  createPatient(patientData: Omit<Patient, "idUsuario">): Promise<Patient>;
  updatePatient(idUsuario: number, updates: Partial<Omit<Patient, "idUsuario">>): Promise<Patient>;
  deletePatient(idUsuario: number): Promise<void>;
}
