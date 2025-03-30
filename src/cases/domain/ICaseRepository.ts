import { Case } from "./Case";

export interface ICaseRepository {
    getAllCases(): Promise<Case[]>;
    getCaseById(id: string): Promise<Case | null>;
    createCase(caseData: Omit<Case, "id" | "createdAt">): Promise<Case>;
    updateCase(id: string, updates: Partial<Case>): Promise<Case>;
    deleteCase(id: string): Promise<void>;
  }
  