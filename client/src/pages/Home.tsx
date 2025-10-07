import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      
      <section className="py-24 bg-gradient-to-br from-primary/10 to-chart-2/10">
        <div className="container px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" data-testid="text-cta-title">
            Ready to Transform Your Prompts?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground" data-testid="text-cta-description">
            Start creating better AI prompts in seconds
          </p>
          <Button
            size="lg"
            className="gap-2"
            onClick={() => setLocation("/app")}
            data-testid="button-get-started"
          >
            Get Started Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
