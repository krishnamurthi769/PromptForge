import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface HistoryItem {
  id: string;
  query: string;
  createdAt: Date;
}

interface HistorySidebarProps {
  items: HistoryItem[];
  onSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function HistorySidebar({ items, onSelect, onDelete }: HistorySidebarProps) {
  return (
    <Card className="p-4 h-full" data-testid="card-history-sidebar">
      <div className="mb-4 flex items-center gap-2">
        <History className="h-5 w-5" />
        <h3 className="font-semibold" data-testid="text-history-title">
          Recent Evaluations
        </h3>
      </div>
      
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-2">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8" data-testid="text-no-history">
              No evaluations yet
            </p>
          ) : (
            items.map((item) => (
              <Card
                key={item.id}
                className="p-3 hover-elevate cursor-pointer"
                onClick={() => onSelect?.(item.id)}
                data-testid={`card-history-item-${item.id}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" data-testid={`text-history-query-${item.id}`}>
                      {item.query}
                    </p>
                    <p className="text-xs text-muted-foreground" data-testid={`text-history-time-${item.id}`}>
                      {formatDistanceToNow(item.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(item.id);
                    }}
                    data-testid={`button-delete-${item.id}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
