// Reference: blueprint:javascript_gemini
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
let useMockData = !apiKey;

if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
    console.log("Gemini API initialized successfully");
  } catch (error) {
    console.warn("Failed to initialize Gemini API, falling back to mock data:", error);
    useMockData = true;
  }
} else {
  console.log("GEMINI_API_KEY not set. Using mock responses. Add your API key to .env file for real responses.");
}

export async function evaluatePrompt(userPrompt: string) {
  // If no API key or initialization failed, return mock data
  if (useMockData) {
    console.log("Using mock data for prompt evaluation");
    return {
      originalPrompt: userPrompt,
      improvedPrompt: `Enhanced version of: "${userPrompt}". This prompt could be improved by adding more context, specifying the desired output format, and including examples of the expected result.`,
      analysis: {
        overallScore: 75,
        clarity: 80,
        specificity: 70,
        structure: 75
      },
      suggestions: [
        "Add more context about your specific use case or industry",
        "Include examples of desired output format",
        "Specify any constraints or limitations",
        "Define the target audience for the response",
        "Add a clear call-to-action or desired outcome"
      ]
    };
  }

  try {
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

    const response = await ai!.models.generateContent({
      model: "gemini-2.0-flash", // Updated model name
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
  } catch (error) {
    console.error("Error evaluating prompt with Gemini API:", error);
    // Fallback to mock data if API call fails
    return {
      originalPrompt: userPrompt,
      improvedPrompt: `Enhanced version of: "${userPrompt}". This prompt could be improved by adding more context, specifying the desired output format, and including examples of the expected result.`,
      analysis: {
        overallScore: 75,
        clarity: 80,
        specificity: 70,
        structure: 75
      },
      suggestions: [
        "Add more context about your specific use case or industry",
        "Include examples of desired output format",
        "Specify any constraints or limitations",
        "Define the target audience for the response",
        "Add a clear call-to-action or desired outcome"
      ]
    };
  }
}

export async function generateAnswer(query: string, searchResults: any[] = []) {
  // If no API key or initialization failed, return mock data
  if (useMockData) {
    console.log("Using mock data for answer generation");
    return `# Response to: "${query}"

This is a mock response to your query. In a production environment with a valid GEMINI_API_KEY, this would contain a detailed, comprehensive answer based on your query and search results.

## Key Points About Your Query

Your query about "${query}" is interesting because it touches on important concepts in AI prompt engineering and natural language processing.

## Detailed Analysis

When approaching a topic like "${query}", there are several factors to consider:

1. **Context Matters**: The effectiveness of any response depends heavily on the context provided in the query
2. **Specificity**: More specific queries generally yield more useful results
3. **Intent Recognition**: Understanding what the user really wants is crucial for providing value

## Recommendations

To get better results with queries like this:

- Provide more specific details about your use case
- Include examples of what you're looking for
- Specify any constraints or requirements
- Define your target audience or context

## Conclusion

While this is a mock response, a real implementation with the Gemini API would provide much more detailed and relevant information tailored specifically to your query.`;
  }

  try {
    let searchResultsSection = "";
    if (searchResults.length > 0) {
      searchResultsSection = "You have been provided with the following search results to help inform your answer:\n\n";
      searchResults.forEach((result, i) => {
        searchResultsSection += `[${i + 1}] ${result.title}
URL: ${result.url}
Snippet: ${result.snippet}

`;
      });
    }

    let citationsNote = "";
    if (searchResults.length > 0) {
      citationsNote = "- Add citations right after statements they support using [1], [2], etc.\n";
    }

    const answerPrompt = `You are PromptForge, an AI prompt evaluator and improvement assistant. Your goal is to write an accurate, detailed, and comprehensive answer to the Query.

${searchResultsSection}
Query: "${query}"

IMPORTANT FORMAT RULES:
- Always start with a few summary sentences (never a header)
- Use Level 2 headers (##) for main sections
- Use bold sparingly for emphasis
- Use lists and markdown tables for comparisons
- All code snippets in proper code blocks with language tags
- All math in LaTeX within \\( \\)
${citationsNote}- Never include a References or Sources section at the end
- Never use hedging or moralizing language
- Never start with a header

Write a well-formatted, expert-level answer that is correct, unbiased, and journalistic in tone.`;

    const response = await ai!.models.generateContent({
      model: "gemini-2.0-flash", // Updated model name
      contents: answerPrompt,
    });

    return response.text ?? "";
  } catch (error) {
    console.error("Error generating answer with Gemini API:", error);
    // Fallback to mock data if API call fails
    return `# Response to: "${query}"

We encountered an issue generating a response with the Gemini API. Here's a mock response instead.

## Understanding Your Query

Your query about "${query}" is interesting and relevant to current AI technologies.

## Key Considerations

When working with topics like "${query}", consider:

1. **Technical Implementation**: How the underlying technology works
2. **Practical Applications**: Real-world use cases and examples
3. **Best Practices**: Established methodologies and approaches
4. **Future Developments**: Upcoming trends and innovations

## Next Steps

To get a real response from the Gemini API:

1. Ensure you have a valid GEMINI_API_KEY in your .env file
2. Check your internet connection
3. Verify that the Gemini API service is operational

## Conclusion

This is a fallback response. With a proper API key and connection, you would see a detailed, comprehensive answer tailored to your specific query.`;
  }
}

export async function searchWeb(query: string) {
  // Mock search results for now - in production, integrate with a real search API
  // When using real API, this would actually search the web
  return [
    {
      title: `Research on: ${query}`,
      url: `https://example.com/research/${encodeURIComponent(query)}`,
      snippet: `Comprehensive research and analysis related to ${query}. This resource provides detailed insights and expert perspectives on the topic.`,
      relevance: 9,
    },
    {
      title: `Guide: ${query}`,
      url: `https://example.com/guide/${encodeURIComponent(query)}`,
      snippet: `A practical guide covering key aspects and best practices for ${query}. Includes examples, case studies, and implementation strategies.`,
      relevance: 8,
    },
    {
      title: `${query} - Latest Developments`,
      url: `https://example.com/news/${encodeURIComponent(query)}`,
      snippet: `Recent updates and developments in ${query}. Stay informed about the latest trends, innovations, and industry news.`,
      relevance: 7,
    },
    {
      title: `Best Practices for ${query}`,
      url: `https://example.com/best-practices/${encodeURIComponent(query)}`,
      snippet: `Expert recommendations and proven methodologies for working with ${query}. Learn from industry leaders and avoid common pitfalls.`,
      relevance: 8,
    },
    {
      title: `Case Studies: ${query}`,
      url: `https://example.com/case-studies/${encodeURIComponent(query)}`,
      snippet: `Real-world examples and success stories demonstrating effective approaches to ${query}. See how others have solved similar challenges.`,
      relevance: 7,
    },
  ];
}