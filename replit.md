# PromptForge - AI Prompt Evaluator & Improvement Assistant

## Overview
PromptForge is an AI-powered web application that evaluates and improves user prompts using Google Gemini AI. The application provides comprehensive prompt analysis, improvement suggestions, and generates detailed answers with proper formatting and citations.

## Current State
- **Status**: Fully functional with real-time AI integration
- **API**: Google Gemini AI (gemini-2.5-flash model)
- **Storage**: In-memory storage for evaluations
- **Frontend**: React with TypeScript, Tailwind CSS, Shadcn UI components
- **Backend**: Express.js with TypeScript

## Key Features
1. **Prompt Evaluation**: Analyzes prompts for clarity, specificity, and structure with numerical scores (0-100)
2. **Smart Improvements**: Generates improved versions of user prompts with detailed suggestions
3. **Answer Generation**: Creates comprehensive, well-formatted answers using markdown with code blocks, tables, and lists
4. **Search Integration**: Includes mock web search results (ready for real search API integration)
5. **Evaluation History**: Stores and retrieves past evaluations with full data persistence
6. **Dark Mode**: Full dark/light theme support with theme persistence

## Architecture

### Frontend (`client/src/`)
- **Pages**:
  - `Home.tsx`: Landing page with hero, features, and how-it-works sections
  - `App.tsx`: Main application with prompt editor, evaluation panel, and results display
  
- **Components**:
  - `PromptEditor`: Textarea for entering prompts with character count
  - `EvaluationPanel`: Displays scores, comparison, and suggestions in tabs
  - `MarkdownRenderer`: Renders AI-generated answers with syntax highlighting
  - `SearchResults`: Shows web search results with relevance scores
  - `HistorySidebar`: Lists recent evaluations with timestamps
  - `Header`: Navigation with theme toggle and branding
  - `ThemeProvider`: Manages dark/light theme state

### Backend (`server/`)
- **gemini.ts**: Gemini AI integration service
  - `evaluatePrompt()`: Analyzes prompts and returns structured evaluation
  - `generateAnswer()`: Creates comprehensive answers with formatting
  - `searchWeb()`: Returns mock search results (ready for real API)

- **routes.ts**: API endpoints
  - `POST /api/evaluate`: Evaluates a prompt and returns full results
  - `GET /api/evaluations`: Returns evaluation history list
  - `GET /api/evaluations/:id`: Returns specific evaluation details
  - `DELETE /api/evaluations/:id`: Deletes an evaluation

- **storage.ts**: In-memory storage interface
  - Manages evaluation CRUD operations
  - Stores: query, originalPrompt, improvedPrompt, analysis, suggestions, answer, sources

### Shared (`shared/`)
- **schema.ts**: TypeScript types and Zod schemas for data validation
  - Evaluation model with all fields
  - Insert schemas for validation

## API Response Format

### Evaluation Response
```json
{
  "id": "uuid",
  "query": "user's query",
  "originalPrompt": "original prompt text",
  "improvedPrompt": "improved prompt text",
  "analysis": {
    "overallScore": 85,
    "clarity": 90,
    "specificity": 88,
    "structure": 78
  },
  "suggestions": [
    "Add specific word count",
    "Include target audience",
    "Define time period"
  ],
  "answer": "markdown formatted answer...",
  "searchResults": [
    {
      "title": "Source title",
      "url": "https://example.com",
      "snippet": "Preview text...",
      "relevance": 9
    }
  ],
  "createdAt": "2024-10-07T20:30:00.000Z"
}
```

## Environment Variables
- `GEMINI_API_KEY`: Google Gemini API key (required)
- `SESSION_SECRET`: Session secret for authentication (configured)

## Recent Changes
- **2024-10-07**: 
  - Integrated Google Gemini AI for real-time prompt evaluation
  - Created backend API endpoints for evaluation, history, and deletion
  - Updated storage to properly persist suggestions as separate field
  - Connected frontend to real API (removed all mock data)
  - Fixed data persistence issue where suggestions weren't stored in history
  - Architect-reviewed and approved all implementation

## Future Enhancements
1. **Real Web Search**: Replace mock search with actual search API (Google, Bing, etc.)
2. **Database**: Migrate from in-memory storage to PostgreSQL for persistence
3. **User Authentication**: Add user accounts to save personal evaluation history
4. **Export**: Add PDF, Markdown, and HTML export for answers
5. **Prompt Templates**: Library of pre-built professional prompts
6. **Side-by-side Comparison**: Visual diff of original vs improved prompts
7. **Streaming Responses**: Real-time streaming of AI generation
8. **Analytics**: Track prompt improvement metrics over time

## Development Commands
- `npm run dev`: Start development server (port 5000)
- `npm run build`: Build for production
- `npm run start`: Start production server

## Tech Stack
- **Frontend**: React 18, TypeScript, TailwindCSS, Shadcn UI, Wouter (routing), TanStack Query
- **Backend**: Express, TypeScript, Google Gemini AI
- **Build**: Vite, ESBuild
- **Styling**: Tailwind CSS with custom design system
- **Markdown**: react-markdown, rehype-highlight, remark-gfm

## Design System
- Primary color: Blue (#3b82f6 - Gemini brand aligned)
- Success color: Emerald (#10b981)
- Warning color: Amber (#f59e0b)
- Font: Inter (UI), JetBrains Mono (code)
- Border radius: 8px (rounded-md)
- Spacing: Consistent with Tailwind spacing scale

## Notes
- All evaluation data is currently stored in memory and will be lost on server restart
- Search results are mocked - implement real search API for production
- Gemini AI responses may vary based on model updates
- Application follows Material Design 3 principles with Linear-inspired refinements
