import { Patient } from "../domain/Patient";
import { IPatientRepository } from "../domain/IPatientRepository";

export class CreatePatient {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(patientData: Omit<Patient, "idUsuario">): Promise<Patient> {
    return await this.patientRepository.createPatient(patientData);
  }
}
