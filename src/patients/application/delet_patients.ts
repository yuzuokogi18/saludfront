import { IPatientRepository } from "../domain/IPatientRepository";

export class DeletePatient {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(idUsuario: number): Promise<void> {
    await this.patientRepository.deletePatient(idUsuario);
  }
}
