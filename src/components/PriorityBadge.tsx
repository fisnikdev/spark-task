import { cn } from "@/lib/utils";
import type { Task } from "@/lib/mock-data";

const styles: Record<Task["priority"], string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning/15 text-warning",
  high: "bg-primary/15 text-primary",
  urgent: "bg-destructive/15 text-destructive",
};

export function PriorityBadge({ priority }: { priority: Task["priority"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
        styles[priority]
      )}
    >
      {priority}
    </span>
  );
}
