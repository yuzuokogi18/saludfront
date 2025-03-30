import { Case } from "../domain/Case";
import { caseApi } from "./caseApi";

export class CaseRepository {
  async getAllCases(): Promise<Case[]> {
    const response = await caseApi.get("/cases");
    return response.data.map((c: any) => new Case(
      c.idExpediente, 
      c.idUsuario, 
      c.temperatura, 
      c.peso, 
      c.estatura, 
      c.ritmoCardiaco, 
      new Date(c.fechaRegistro)
    ));
  }

  async getCaseById(id: string): Promise<Case | null> {
    const response = await caseApi.get(`/cases/${id}`);
    return response.data 
      ? new Case(
          response.data.idExpediente,
          response.data.idUsuario,
          response.data.temperatura,
          response.data.peso,
          response.data.estatura,
          response.data.ritmoCardiaco,
          new Date(response.data.fechaRegistro)
        ) 
      : null;
  }

  async createCase(caseData: Omit<Case, "idExpediente" | "fechaRegistro">): Promise<Case> {
    const response = await caseApi.post("/cases", caseData);
    return new Case(
      response.data.idExpediente, 
      response.data.idUsuario, 
      response.data.temperatura, 
      response.data.peso, 
      response.data.estatura, 
      response.data.ritmoCardiaco, 
      new Date(response.data.fechaRegistro)
    );
  }

  async updateCase(id: string, updates: Partial<Case>): Promise<Case> {
    const response = await caseApi.put(`/cases/${id}`, updates);
    return new Case(
      response.data.idExpediente, 
      response.data.idUsuario, 
      response.data.temperatura, 
      response.data.peso, 
      response.data.estatura, 
      response.data.ritmoCardiaco, 
      new Date(response.data.fechaRegistro)
    );
  }

  async deleteCase(id: string): Promise<void> {
    await caseApi.delete(`/cases/${id}`);
  }
}
