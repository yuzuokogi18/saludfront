import { CaseRepository } from '../infrastructure/CaseRepository';
import { Case } from '../domain/Case';


class CaseService {
  private caseRepository: CaseRepository;

  constructor() {
    this.caseRepository = new CaseRepository();
  }

  async createCase(caseData: Omit<Case, "idExpediente" | "fechaRegistro">): Promise<Case> {
    try {
      // Llamar al repositorio para crear un nuevo caso
      const createdCase = await this.caseRepository.createCase(caseData);
      
      // Devolver el caso creado
      return createdCase;
    } catch (error) {
      // Manejo de errores, dependiendo de tus necesidades
      console.error("Error creating case:", error);
      throw new Error("No se pudo crear el caso");
    }
  }
}
