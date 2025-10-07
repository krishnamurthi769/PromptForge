import { useState } from "react";
import { PromptEditor } from "@/components/PromptEditor";
import { EvaluationPanel } from "@/components/EvaluationPanel";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { SearchResults } from "@/components/SearchResults";
import { HistorySidebar } from "@/components/HistorySidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

//todo: remove mock functionality
const mockEvaluation = {
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

//todo: remove mock functionality
const mockSearchResults = [
  {
    title: "AI in Healthcare: Transforming Patient Care",
    url: "https://www.nature.com/articles/ai-healthcare-2024",
    snippet: "Artificial intelligence is revolutionizing healthcare delivery through predictive analytics, personalized medicine, and improved diagnostic accuracy.",
    relevance: 9,
  },
  {
    title: "The Future of Medical Diagnostics with Machine Learning",
    url: "https://www.thelancet.com/digital-health/ml-diagnostics",
    snippet: "Machine learning algorithms demonstrate unprecedented accuracy in detecting diseases from medical imaging. Clinical trials indicate a 95% success rate.",
    relevance: 8,
  },
  {
    title: "Ethical Considerations in AI-Driven Medicine",
    url: "https://www.nejm.org/ethics-ai-medicine",
    snippet: "As AI becomes more prevalent in healthcare, questions about patient privacy, algorithmic bias, and decision-making transparency become increasingly important.",
    relevance: 7,
  },
];

//todo: remove mock functionality
const mockAnswer = `Artificial Intelligence has revolutionized healthcare through advanced diagnostic capabilities and personalized treatment plans. The integration of AI in medical imaging has improved early detection rates significantly.

## Key Applications

### Diagnostic Tools
AI-powered diagnostic systems analyze medical images with remarkable accuracy. Studies show that AI can detect certain conditions with **95% accuracy**, matching or exceeding human radiologists in specific tasks.

### Patient Care
Machine learning algorithms help predict patient outcomes and recommend personalized treatment plans. This includes:
- Risk assessment for chronic diseases
- Medication optimization
- Treatment response prediction
- Early warning systems for deteriorating conditions

## Code Example

Here's a simple example of how AI models process medical data:

\`\`\`python
import tensorflow as tf

def predict_diagnosis(image_data):
    model = tf.keras.models.load_model('medical_model.h5')
    prediction = model.predict(image_data)
    return prediction
\`\`\`

## Statistics

| Application | Accuracy | Adoption Rate |
|-------------|----------|---------------|
| Medical Imaging | 95% | 67% |
| Disease Prediction | 88% | 52% |
| Treatment Planning | 91% | 45% |

**Note:** All data represents 2024 industry benchmarks.`;

//todo: remove mock functionality
const mockHistory = [
  {
    id: "1",
    query: "Write a blog post about AI in healthcare",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    query: "Create a marketing email for a SaaS product launch",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "3",
    query: "Explain quantum computing to a beginner",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
];

export default function AppPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [historyItems, setHistoryItems] = useState(mockHistory);

  const handleEvaluate = (prompt: string) => {
    console.log("Evaluating prompt:", prompt);
    setIsLoading(true);
    
    //todo: remove mock functionality - replace with real API call
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const handleSelectHistory = (id: string) => {
    console.log("Selected history item:", id);
    setShowResults(true);
  };

  const handleDeleteHistory = (id: string) => {
    console.log("Deleted history item:", id);
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="container flex gap-6 py-6 px-6">
      <aside className="hidden lg:block w-80 shrink-0">
        <HistorySidebar
          items={historyItems}
          onSelect={handleSelectHistory}
          onDelete={handleDeleteHistory}
        />
      </aside>
      
      <main className="flex-1 space-y-6">
        <PromptEditor onEvaluate={handleEvaluate} isLoading={isLoading} />
        
        {showResults && (
          <Tabs defaultValue="evaluation" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="evaluation" data-testid="tab-evaluation">
                Evaluation
              </TabsTrigger>
              <TabsTrigger value="answer" data-testid="tab-answer">
                Answer
              </TabsTrigger>
              <TabsTrigger value="sources" data-testid="tab-sources">
                Sources
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="evaluation" className="mt-6">
              <EvaluationPanel {...mockEvaluation} />
            </TabsContent>
            
            <TabsContent value="answer" className="mt-6">
              <MarkdownRenderer content={mockAnswer} />
            </TabsContent>
            
            <TabsContent value="sources" className="mt-6">
              <SearchResults results={mockSearchResults} />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
