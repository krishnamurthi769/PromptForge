import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

interface EvaluationPanelProps {
  originalPrompt: string;
  improvedPrompt: string;
  analysis: {
    overallScore: number;
    clarity: number;
    specificity: number;
    structure: number;
  };
  suggestions: string[];
}

export function EvaluationPanel({
  originalPrompt,
  improvedPrompt,
  analysis,
  suggestions,
}: EvaluationPanelProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-chart-2";
    if (score >= 60) return "text-chart-3";
    return "text-destructive";
  };

  return (
    <Card className="p-6" data-testid="card-evaluation-panel">
      <div className="mb-6">
        <h3 className="mb-4 text-2xl font-semibold" data-testid="text-evaluation-title">
          Prompt Evaluation Results
        </h3>
        
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="text-center" data-testid="score-overall">
            <div className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}>
              {analysis.overallScore}
            </div>
            <div className="text-sm text-muted-foreground">Overall</div>
          </div>
          <div className="text-center" data-testid="score-clarity">
            <div className={`text-3xl font-bold ${getScoreColor(analysis.clarity)}`}>
              {analysis.clarity}
            </div>
            <div className="text-sm text-muted-foreground">Clarity</div>
          </div>
          <div className="text-center" data-testid="score-specificity">
            <div className={`text-3xl font-bold ${getScoreColor(analysis.specificity)}`}>
              {analysis.specificity}
            </div>
            <div className="text-sm text-muted-foreground">Specificity</div>
          </div>
          <div className="text-center" data-testid="score-structure">
            <div className={`text-3xl font-bold ${getScoreColor(analysis.structure)}`}>
              {analysis.structure}
            </div>
            <div className="text-sm text-muted-foreground">Structure</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="comparison" data-testid="tab-comparison">
            Comparison
          </TabsTrigger>
          <TabsTrigger value="suggestions" data-testid="tab-suggestions">
            Suggestions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="comparison" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-chart-3" />
                <h4 className="font-semibold" data-testid="text-original-label">
                  Original Prompt
                </h4>
              </div>
              <Card className="p-4 bg-muted/50">
                <p className="font-mono text-sm whitespace-pre-wrap" data-testid="text-original-prompt">
                  {originalPrompt}
                </p>
              </Card>
            </div>
            
            <div>
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-chart-2" />
                <h4 className="font-semibold" data-testid="text-improved-label">
                  Improved Prompt
                </h4>
              </div>
              <Card className="p-4 bg-chart-2/5">
                <p className="font-mono text-sm whitespace-pre-wrap" data-testid="text-improved-prompt">
                  {improvedPrompt}
                </p>
              </Card>
            </div>
          </div>
          
          <div className="flex items-center justify-center text-muted-foreground">
            <ArrowRight className="h-5 w-5" />
          </div>
        </TabsContent>
        
        <TabsContent value="suggestions" className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <Card key={index} className="p-4" data-testid={`card-suggestion-${index}`}>
              <div className="flex gap-3">
                <Badge className="h-6 shrink-0" data-testid={`badge-suggestion-${index}`}>
                  {index + 1}
                </Badge>
                <p className="text-sm" data-testid={`text-suggestion-${index}`}>
                  {suggestion}
                </p>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
