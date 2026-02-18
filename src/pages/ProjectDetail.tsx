import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { List, LayoutGrid, CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/TaskCard";
import { TaskDetailModal } from "@/components/TaskDetailModal";
import { UserAvatar } from "@/components/UserAvatar";
import { projects, getTasksByStatus, type Task } from "@/lib/mock-data";

const columns: { status: Task["status"]; label: string }[] = [
  { status: "todo", label: "To Do" },
  { status: "in_progress", label: "In Progress" },
  { status: "done", label: "Done" },
];

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [view, setView] = useState<"board" | "list">("board");

  if (!project) {
    return <div className="text-muted-foreground p-8">Project not found.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: project.color }} />
            <h1 className="text-xl font-bold">{project.name}</h1>
          </div>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-1.5">
            {project.members.map((m) => (
              <UserAvatar key={m.id} name={m.name} avatar={m.avatar} size="sm" />
            ))}
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add task
          </Button>
        </div>
      </motion.div>

      {/* View Switcher */}
      <div className="flex items-center gap-1 border border-border rounded-lg p-0.5 w-fit bg-muted/50">
        <ViewButton active={view === "board"} onClick={() => setView("board")} icon={LayoutGrid} label="Board" />
        <ViewButton active={view === "list"} onClick={() => setView("list")} icon={List} label="List" />
        <ViewButton active={false} onClick={() => {}} icon={CalendarDays} label="Calendar" disabled />
      </div>

      {/* Board View */}
      {view === "board" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((col) => {
            const colTasks = getTasksByStatus(project.id, col.status);
            return (
              <div key={col.status} className="space-y-2">
                <div className="flex items-center justify-between px-1 mb-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {col.label}{" "}
                    <span className="text-xs ml-1 opacity-60">{colTasks.length}</span>
                  </h3>
                </div>
                <div className="space-y-2 min-h-[100px] rounded-lg bg-muted/30 p-2">
                  {colTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />
                  ))}
                  {colTasks.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-8">No tasks</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="space-y-2">
          {columns.map((col) => {
            const colTasks = getTasksByStatus(project.id, col.status);
            if (colTasks.length === 0) return null;
            return (
              <div key={col.status} className="space-y-1.5">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1 pt-2">
                  {col.label} ({colTasks.length})
                </h3>
                {colTasks.map((task) => (
                  <TaskCard key={task.id} task={task} variant="row" onClick={() => setSelectedTask(task)} />
                ))}
              </div>
            );
          })}
        </div>
      )}

      <TaskDetailModal task={selectedTask} open={!!selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}

function ViewButton({
  active,
  onClick,
  icon: Icon,
  label,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
