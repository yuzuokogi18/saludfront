import { CaseRepository } from '../infrastructure/CaseRepository';
import { Case } from '../domain/Case';

const caseRepository = new CaseRepository();

// Método para actualizar un caso
async function updateCase(id: string, updates: Partial<Case>): Promise<Case> {
  try {
    // Llamar al repositorio para actualizar el caso
    const updatedCase = await caseRepository.updateCase(id, updates);
    
    // Devolver el caso actualizado
    return updatedCase;
  } catch (error) {
    // Manejo de errores
    console.error("Error actualizando el caso:", error);
    throw new Error("No se pudo actualizar el caso");
  }
}

export { updateCase };
