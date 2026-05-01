import type { User } from "@shared/schema";

export interface IStorage {
  // Add other methods here
}

export class DatabaseStorage implements IStorage {
  // Add implementation here
}

export const storage = new DatabaseStorage();
