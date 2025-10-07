import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { evaluatePrompt, generateAnswer, searchWeb } from "./gemini";
import { insertEvaluationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Evaluate a prompt and generate comprehensive results
  app.post("/api/evaluate", async (req, res) => {
    try {
      const { query } = req.body;
      
      if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Query is required" });
      }

      // Step 1: Evaluate the prompt
      const evaluation = await evaluatePrompt(query);
      
      // Step 2: Search the web for relevant information
      const searchResults = await searchWeb(query);
      
      // Step 3: Generate a comprehensive answer
      const answer = await generateAnswer(query, searchResults);
      
      // Step 4: Store the evaluation
      const storedEvaluation = await storage.createEvaluation({
        query,
        originalPrompt: evaluation.originalPrompt,
        improvedPrompt: evaluation.improvedPrompt,
        analysis: JSON.stringify(evaluation.analysis),
        suggestions: JSON.stringify(evaluation.suggestions),
        answer,
        sources: JSON.stringify(searchResults),
      });

      // Return the complete evaluation
      res.json({
        id: storedEvaluation.id,
        query,
        originalPrompt: evaluation.originalPrompt,
        improvedPrompt: evaluation.improvedPrompt,
        analysis: evaluation.analysis,
        suggestions: evaluation.suggestions,
        answer,
        searchResults,
        createdAt: storedEvaluation.createdAt,
      });
    } catch (error) {
      console.error("Error evaluating prompt:", error);
      res.status(500).json({ error: "Failed to evaluate prompt" });
    }
  });

  // Get all evaluations (history)
  app.get("/api/evaluations", async (req, res) => {
    try {
      const evaluations = await storage.getAllEvaluations();
      res.json(
        evaluations.map((e) => ({
          id: e.id,
          query: e.query,
          createdAt: e.createdAt,
        }))
      );
    } catch (error) {
      console.error("Error fetching evaluations:", error);
      res.status(500).json({ error: "Failed to fetch evaluations" });
    }
  });

  // Get a specific evaluation by ID
  app.get("/api/evaluations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const evaluation = await storage.getEvaluation(id);
      
      if (!evaluation) {
        return res.status(404).json({ error: "Evaluation not found" });
      }

      res.json({
        id: evaluation.id,
        query: evaluation.query,
        originalPrompt: evaluation.originalPrompt,
        improvedPrompt: evaluation.improvedPrompt,
        analysis: evaluation.analysis ? JSON.parse(evaluation.analysis) : null,
        suggestions: evaluation.suggestions ? JSON.parse(evaluation.suggestions) : [],
        answer: evaluation.answer,
        searchResults: evaluation.sources ? JSON.parse(evaluation.sources) : [],
        createdAt: evaluation.createdAt,
      });
    } catch (error) {
      console.error("Error fetching evaluation:", error);
      res.status(500).json({ error: "Failed to fetch evaluation" });
    }
  });

  // Delete an evaluation
  app.delete("/api/evaluations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteEvaluation(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Evaluation not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting evaluation:", error);
      res.status(500).json({ error: "Failed to delete evaluation" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
