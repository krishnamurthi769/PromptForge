import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-chart-2/10 py-24 md:py-32">
      <div className="container relative z-10 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2" data-testid="badge-powered-by">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Powered by Google Gemini AI</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl" data-testid="text-hero-title">
            Elevate Your AI Prompts with{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              PromptForge
            </span>
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground md:text-xl" data-testid="text-hero-description">
            Get instant prompt evaluations, improvement suggestions, and comprehensive 
            AI-generated answers with proper citations and expert-level formatting.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="gap-2" data-testid="button-start-evaluating">
              Start Evaluating
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" data-testid="button-see-example">
              See Example
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
    </section>
  );
}
