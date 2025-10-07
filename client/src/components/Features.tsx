import { Card } from "@/components/ui/card";
import { Sparkles, Target, FileText, Search, Zap, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Prompt Evaluation",
    description: "Analyze your prompts for clarity, specificity, and effectiveness with detailed scoring.",
  },
  {
    icon: Sparkles,
    title: "Smart Improvements",
    description: "Get actionable suggestions to transform basic prompts into expert-level instructions.",
  },
  {
    icon: Search,
    title: "Web Search Integration",
    description: "Gather relevant information from multiple sources to enrich your answers.",
  },
  {
    icon: FileText,
    title: "Formatted Answers",
    description: "Receive well-structured answers with markdown formatting, code blocks, and tables.",
  },
  {
    icon: CheckCircle,
    title: "Proper Citations",
    description: "Every answer includes source citations for transparency and credibility.",
  },
  {
    icon: Zap,
    title: "Real-time Generation",
    description: "Watch your improved prompts and answers generate in real-time with streaming.",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-card/50" data-testid="section-features">
      <div className="container px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-testid="text-features-title">
            Everything You Need to Craft Better Prompts
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-features-description">
            Powerful features to help you create, evaluate, and improve AI prompts
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover-elevate"
                data-testid={`card-feature-${index}`}
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold" data-testid={`text-feature-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-feature-description-${index}`}>
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
