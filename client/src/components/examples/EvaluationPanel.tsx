import { EvaluationPanel } from '../EvaluationPanel';

export default function EvaluationPanelExample() {
  const mockData = {
    originalPrompt: "Write a blog post about AI",
    improvedPrompt: "Write a comprehensive 1500-word blog post about the practical applications of AI in healthcare, focusing on diagnostic tools, patient care, and ethical considerations. Include recent statistics and real-world examples from 2024. Target audience: healthcare professionals and tech enthusiasts. Tone: informative yet accessible.",
    analysis: {
      overallScore: 85,
      clarity: 90,
      specificity: 88,
      structure: 78,
    },
    suggestions: [
      "Add specific word count for better scope definition",
      "Include target audience specification for appropriate tone",
      "Define the time period for relevance (e.g., 'recent' vs specific year)",
      "Specify desired format elements (statistics, examples, case studies)",
      "Clarify the tone and writing style expected",
    ],
  };

  return (
    <div className="p-6">
      <EvaluationPanel {...mockData} />
    </div>
  );
}
