import { CaseRepository } from '../infrastructure/CaseRepository';
import { Case } from '../domain/Case';

export const createCase = async (
  caseData: Omit<Case, "idExpediente" | "fechaRegistro">
): Promise<Case> => {
  const caseRepository = new CaseRepository();

  try {
    const createdCase = await caseRepository.createCase(caseData);
    return createdCase;
  } catch (error) {
    console.error("Error creating case:", error);
    throw new Error("No se pudo crear el caso");
  }
};
