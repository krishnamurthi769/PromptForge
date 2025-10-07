import { Card } from "@/components/ui/card";
import { FileEdit, Brain, CheckCheck } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: FileEdit,
    title: "Input Your Prompt",
    description: "Enter the AI prompt or query you want to evaluate and improve.",
  },
  {
    number: 2,
    icon: Brain,
    title: "AI Analysis",
    description: "Our system analyzes your prompt and searches for relevant information.",
  },
  {
    number: 3,
    icon: CheckCheck,
    title: "Get Results",
    description: "Receive improved prompts, detailed analysis, and comprehensive answers.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24" data-testid="section-how-it-works">
      <div className="container px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-testid="text-how-it-works-title">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-how-it-works-description">
            Three simple steps to transform your AI prompts
          </p>
        </div>
        
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.number}
                className="relative p-6 text-center"
                data-testid={`card-step-${step.number}`}
              >
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {step.number}
                  </div>
                </div>
                <div className="mb-4 flex justify-center">
                  <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold" data-testid={`text-step-title-${step.number}`}>
                  {step.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-step-description-${step.number}`}>
                  {step.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
