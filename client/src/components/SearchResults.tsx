import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  relevance: number;
}

interface SearchResultsProps {
  results: SearchResult[];
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <Card className="p-6" data-testid="card-search-results">
      <h3 className="mb-4 text-lg font-semibold" data-testid="text-search-results-title">
        Web Search Results
      </h3>
      
      <div className="space-y-4">
        {results.map((result, index) => (
          <Card
            key={index}
            className="p-4 hover-elevate"
            data-testid={`card-result-${index}`}
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="flex-1">
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold text-primary hover:underline"
                  data-testid={`link-result-${index}`}
                >
                  {result.title}
                  <ExternalLink className="h-4 w-4" />
                </a>
                <p className="text-xs text-muted-foreground mt-1" data-testid={`text-result-url-${index}`}>
                  {new URL(result.url).hostname}
                </p>
              </div>
              <Badge variant="outline" data-testid={`badge-relevance-${index}`}>
                {result.relevance}/10
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground" data-testid={`text-result-snippet-${index}`}>
              {result.snippet}
            </p>
          </Card>
        ))}
      </div>
    </Card>
  );
}
