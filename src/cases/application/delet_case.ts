import { CaseRepository } from "../infrastructure/CaseRepository";
const caseRepository = new CaseRepository();

// Método para eliminar un caso
async function deleteCase(id: string): Promise<void> {
  try {
    // Llamar al repositorio para eliminar el caso
    await caseRepository.deleteCase(id);
    console.log(`Caso con id ${id} eliminado exitosamente`);
  } catch (error) {
    // Manejo de errores
    console.error("Error al eliminar el caso:", error);
    throw new Error("No se pudo eliminar el caso");
  }
}

export { deleteCase };
