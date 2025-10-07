import { type User, type InsertUser, type Evaluation, type InsertEvaluation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createEvaluation(evaluation: InsertEvaluation): Promise<Evaluation>;
  getEvaluation(id: string): Promise<Evaluation | undefined>;
  getAllEvaluations(): Promise<Evaluation[]>;
  deleteEvaluation(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private evaluations: Map<string, Evaluation>;

  constructor() {
    this.users = new Map();
    this.evaluations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createEvaluation(insertEvaluation: InsertEvaluation): Promise<Evaluation> {
    const id = randomUUID();
    const evaluation: Evaluation = {
      id,
      query: insertEvaluation.query,
      originalPrompt: insertEvaluation.originalPrompt || null,
      improvedPrompt: insertEvaluation.improvedPrompt || null,
      analysis: insertEvaluation.analysis || null,
      suggestions: insertEvaluation.suggestions || null,
      answer: insertEvaluation.answer || null,
      sources: insertEvaluation.sources || null,
      createdAt: new Date(),
    };
    this.evaluations.set(id, evaluation);
    return evaluation;
  }

  async getEvaluation(id: string): Promise<Evaluation | undefined> {
    return this.evaluations.get(id);
  }

  async getAllEvaluations(): Promise<Evaluation[]> {
    return Array.from(this.evaluations.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async deleteEvaluation(id: string): Promise<boolean> {
    return this.evaluations.delete(id);
  }
}

export const storage = new MemStorage();
