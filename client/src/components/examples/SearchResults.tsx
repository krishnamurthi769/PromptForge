import { SearchResults } from '../SearchResults';

export default function SearchResultsExample() {
  const mockResults = [
    {
      title: "AI in Healthcare: Transforming Patient Care",
      url: "https://www.nature.com/articles/ai-healthcare-2024",
      snippet: "Artificial intelligence is revolutionizing healthcare delivery through predictive analytics, personalized medicine, and improved diagnostic accuracy. Recent studies show...",
      relevance: 9,
    },
    {
      title: "The Future of Medical Diagnostics with Machine Learning",
      url: "https://www.thelancet.com/digital-health/ml-diagnostics",
      snippet: "Machine learning algorithms demonstrate unprecedented accuracy in detecting diseases from medical imaging. Clinical trials indicate a 95% success rate in early cancer detection...",
      relevance: 8,
    },
    {
      title: "Ethical Considerations in AI-Driven Medicine",
      url: "https://www.nejm.org/ethics-ai-medicine",
      snippet: "As AI becomes more prevalent in healthcare, questions about patient privacy, algorithmic bias, and decision-making transparency become increasingly important...",
      relevance: 7,
    },
  ];

  return (
    <div className="p-6">
      <SearchResults results={mockResults} />
    </div>
  );
}
