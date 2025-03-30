import { IPatientRepository } from "../domain/IPatientRepository";
import { Patient } from "../domain/Patient";

export class GetAllPatients {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(): Promise<Patient[]> {
    return await this.patientRepository.getAllPatients();
  }
}
