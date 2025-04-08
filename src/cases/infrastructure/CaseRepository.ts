// src/infrastructure/CaseRepository.ts
import { Case } from "../domain/Case";
import { caseApi } from "./caseApi";
import { WebSocketService } from "../../websocket/casesSocket";

export class CaseRepository {
  private webSocketService: WebSocketService;

  constructor() {
    this.webSocketService = new WebSocketService();

    // Suscribirse a los eventos de WebSocket
    this.webSocketService.onNewCase((newCaseData: string) => {
      const newCase = JSON.parse(newCaseData);
      console.log("Nuevo caso recibido:", newCase);

      // Aquí puedes agregar lógica para agregar el nuevo caso a la lista
      // o actualizar el estado de la UI según lo necesites
    });
  }

  async getAllCases(): Promise<Case[]> {
    // Obtén todos los casos inicialmente
    const response = await caseApi.get("/cases");
    const cases = response.data.map((c: any) => new Case(
      c.idExpediente, 
      c.idUsuario, 
      c.temperatura, 
      c.peso, 
      c.estatura, 
      c.ritmoCardiaco, 
      new Date(c.fechaRegistro)
    ));

    return cases;
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
