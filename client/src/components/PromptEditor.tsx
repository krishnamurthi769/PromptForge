import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";

interface PromptEditorProps {
  onEvaluate?: (prompt: string) => void;
  isLoading?: boolean;
}

export function PromptEditor({ onEvaluate, isLoading = false }: PromptEditorProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (prompt.trim() && onEvaluate) {
      console.log("Evaluating prompt:", prompt);
      onEvaluate(prompt);
    }
  };

  return (
    <Card className="p-6" data-testid="card-prompt-editor">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold" data-testid="text-editor-title">
          Enter Your Prompt
        </h3>
        <span className="text-sm text-muted-foreground" data-testid="text-character-count">
          {prompt.length} characters
        </span>
      </div>
      
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type or paste your AI prompt here..."
        className="min-h-[200px] font-mono text-base resize-none"
        data-testid="input-prompt"
      />
      
      <div className="mt-4 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setPrompt("")}
          disabled={!prompt || isLoading}
          data-testid="button-clear"
        >
          Clear
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={!prompt.trim() || isLoading}
          className="gap-2"
          data-testid="button-evaluate"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Evaluating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Evaluate Prompt
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
