import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task } from "@/lib/mock-data";
import { UserAvatar } from "@/components/UserAvatar";
import { PriorityBadge } from "@/components/PriorityBadge";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  variant?: "card" | "row";
}

export function TaskCard({ task, onClick, variant = "card" }: TaskCardProps) {
  if (variant === "row") {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors group"
      >
        <StatusDot status={task.status} />
        <span className="flex-1 text-sm font-medium truncate">{task.title}</span>
        <PriorityBadge priority={task.priority} />
        {task.dueDate && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        )}
        {task.assignee && <UserAvatar name={task.assignee.name} avatar={task.assignee.avatar} size="sm" />}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-2.5 w-full text-left p-3 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors"
    >
      <span className="text-sm font-medium leading-snug">{task.title}</span>
      <div className="flex items-center justify-between">
        <PriorityBadge priority={task.priority} />
        <div className="flex items-center gap-2">
          {task.dueDate && (
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          )}
          {task.assignee && <UserAvatar name={task.assignee.name} avatar={task.assignee.avatar} size="sm" />}
        </div>
      </div>
    </button>
  );
}

function StatusDot({ status }: { status: Task["status"] }) {
  return (
    <span
      className={cn(
        "h-2 w-2 rounded-full shrink-0",
        status === "todo" && "bg-muted-foreground",
        status === "in_progress" && "bg-warning",
        status === "done" && "bg-success"
      )}
    />
  );
}
