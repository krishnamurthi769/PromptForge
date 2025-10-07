// Reference: blueprint:javascript_gemini
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set");
}

const ai = new GoogleGenAI({ apiKey });

export async function evaluatePrompt(userPrompt: string) {
  const evaluationPrompt = `You are an expert AI prompt evaluator. Analyze the following user prompt and provide:

1. An overall quality score (0-100)
2. Individual scores for:
   - Clarity (0-100)
   - Specificity (0-100)
   - Structure (0-100)
3. An improved version of the prompt that is more detailed, specific, and effective
4. 3-5 specific, actionable suggestions for improvement

User Prompt: "${userPrompt}"

Respond in JSON format:
{
  "originalPrompt": "the original prompt",
  "improvedPrompt": "your improved version",
  "analysis": {
    "overallScore": number,
    "clarity": number,
    "specificity": number,
    "structure": number
  },
  "suggestions": ["suggestion 1", "suggestion 2", ...]
}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          originalPrompt: { type: "string" },
          improvedPrompt: { type: "string" },
          analysis: {
            type: "object",
            properties: {
              overallScore: { type: "number" },
              clarity: { type: "number" },
              specificity: { type: "number" },
              structure: { type: "number" },
            },
            required: ["overallScore", "clarity", "specificity", "structure"],
          },
          suggestions: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["originalPrompt", "improvedPrompt", "analysis", "suggestions"],
      },
    },
    contents: evaluationPrompt,
  });

  const jsonText = response.text || "{}";
  return JSON.parse(jsonText);
}

export async function generateAnswer(query: string, searchResults: any[] = []) {
  const answerPrompt = `You are PromptForge, an AI prompt evaluator and improvement assistant. Your goal is to write an accurate, detailed, and comprehensive answer to the Query.

${searchResults.length > 0 ? `You have been provided with the following search results to help inform your answer:\n\n${searchResults.map((r, i) => `[${i + 1}] ${r.title}\nURL: ${r.url}\nSnippet: ${r.snippet}\n`).join('\n')}\n` : ''}

Query: "${query}"

IMPORTANT FORMAT RULES:
- Always start with a few summary sentences (never a header)
- Use Level 2 headers (##) for main sections
- Use bold sparingly for emphasis
- Use lists and markdown tables for comparisons
- All code snippets in proper markdown code blocks with language tags
- All math in LaTeX within \\( \\)
${searchResults.length > 0 ? '- Add citations right after statements they support using [1], [2], etc.' : ''}
- Never include a References or Sources section at the end
- Never use hedging or moralizing language
- Never start with a header

Write a well-formatted, expert-level answer that is correct, unbiased, and journalistic in tone.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: answerPrompt,
  });

  return response.text ?? "";
}

export async function searchWeb(query: string) {
  // Mock search results for now - in production, integrate with a real search API
  return [
    {
      title: `Research on: ${query}`,
      url: `https://example.com/research/${encodeURIComponent(query)}`,
      snippet: `Comprehensive research and analysis related to ${query}. This resource provides detailed insights and expert perspectives.`,
      relevance: 9,
    },
    {
      title: `Guide: ${query}`,
      url: `https://example.com/guide/${encodeURIComponent(query)}`,
      snippet: `A practical guide covering key aspects and best practices for ${query}. Includes examples and real-world applications.`,
      relevance: 8,
    },
    {
      title: `${query} - Latest Developments`,
      url: `https://example.com/news/${encodeURIComponent(query)}`,
      snippet: `Recent updates and developments in ${query}. Stay informed about the latest trends and innovations.`,
      relevance: 7,
    },
  ];
}
