import { IPatientRepository } from "../domain/IPatientRepository";
import { Patient } from "../domain/Patient";

export class UpdatePatient {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(idUsuario: number, updates: Partial<Omit<Patient, "idUsuario">>): Promise<Patient> {
    return await this.patientRepository.updatePatient(idUsuario, updates);
  }
}
