import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { PromptEditor } from "@/components/PromptEditor";
import { EvaluationPanel } from "@/components/EvaluationPanel";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { SearchResults } from "@/components/SearchResults";
import { HistorySidebar } from "@/components/HistorySidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface EvaluationResult {
  id: string;
  query: string;
  originalPrompt: string;
  improvedPrompt: string;
  analysis: {
    overallScore: number;
    clarity: number;
    specificity: number;
    structure: number;
  };
  suggestions: string[];
  answer: string;
  searchResults: any[];
  createdAt: string;
}

export default function AppPage() {
  const [currentEvaluation, setCurrentEvaluation] = useState<EvaluationResult | null>(null);
  const { toast } = useToast();

  // Fetch evaluation history
  const { data: historyData = [] } = useQuery<Array<{ id: string; query: string; createdAt: string }>>({
    queryKey: ["/api/evaluations"],
  });

  // Mutation for creating new evaluations
  const evaluateMutation = useMutation({
    mutationFn: async (query: string) => {
      const res = await apiRequest("POST", "/api/evaluate", { query });
      return await res.json() as EvaluationResult;
    },
    onSuccess: (data: EvaluationResult) => {
      setCurrentEvaluation(data);
      queryClient.invalidateQueries({ queryKey: ["/api/evaluations"] });
      toast({
        title: "Evaluation Complete",
        description: "Your prompt has been analyzed successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to evaluate prompt",
        variant: "destructive",
      });
    },
  });

  // Mutation for deleting evaluations
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/evaluations/${id}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/evaluations"] });
      toast({
        title: "Deleted",
        description: "Evaluation removed from history.",
      });
    },
  });

  const handleEvaluate = (prompt: string) => {
    evaluateMutation.mutate(prompt);
  };

  const handleSelectHistory = async (id: string) => {
    try {
      const data = await fetch(`/api/evaluations/${id}`).then((res) => res.json());
      
      // Parse the analysis if it's a string
      const parsedAnalysis = typeof data.analysis === 'string' 
        ? JSON.parse(data.analysis) 
        : data.analysis;
      
      setCurrentEvaluation({
        ...data,
        analysis: parsedAnalysis,
        suggestions: parsedAnalysis.suggestions || [],
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load evaluation",
        variant: "destructive",
      });
    }
  };

  const handleDeleteHistory = (id: string) => {
    deleteMutation.mutate(id);
  };

  const historyItems = historyData.map((item) => ({
    id: item.id,
    query: item.query,
    createdAt: new Date(item.createdAt),
  }));

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
        <PromptEditor 
          onEvaluate={handleEvaluate} 
          isLoading={evaluateMutation.isPending} 
        />
        
        {currentEvaluation && (
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
              <EvaluationPanel
                originalPrompt={currentEvaluation.originalPrompt}
                improvedPrompt={currentEvaluation.improvedPrompt}
                analysis={currentEvaluation.analysis}
                suggestions={currentEvaluation.suggestions}
              />
            </TabsContent>
            
            <TabsContent value="answer" className="mt-6">
              <MarkdownRenderer content={currentEvaluation.answer} />
            </TabsContent>
            
            <TabsContent value="sources" className="mt-6">
              <SearchResults results={currentEvaluation.searchResults} />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
