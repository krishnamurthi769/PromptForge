import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface MarkdownRendererProps {
  content: string;
  title?: string;
}

export function MarkdownRenderer({ content, title = "Generated Answer" }: MarkdownRendererProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6" data-testid="card-markdown-renderer">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold" data-testid="text-markdown-title">
          {title}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
          data-testid="button-copy-markdown"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>
      
      <div
        className="prose prose-sm dark:prose-invert max-w-none"
        data-testid="content-markdown"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            code: ({ node, inline, className, children, ...props }: any) => {
              return inline ? (
                <code className={className} {...props}>
                  {children}
                </code>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </Card>
  );
}
