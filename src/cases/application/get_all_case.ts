import { CaseRepository } from '../infrastructure/CaseRepository';
import { Case } from '../domain/Case';

const caseRepository = new CaseRepository();

// Método para obtener todos los casos
async function getAllCases(): Promise<Case[]> {
  try {
    // Llamar al repositorio para obtener todos los casos
    const cases = await caseRepository.getAllCases();
    
    // Devolver la lista de casos
    return cases;
  } catch (error) {
    // Manejo de errores
    console.error("Error obteniendo los casos:", error);
    throw new Error("No se pudieron obtener los casos");
  }
}

export { getAllCases };
