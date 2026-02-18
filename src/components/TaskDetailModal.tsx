import { X, Calendar, User, Paperclip, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/UserAvatar";
import { PriorityBadge } from "@/components/PriorityBadge";
import type { Task } from "@/lib/mock-data";

interface TaskDetailModalProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
}

export function TaskDetailModal({ task, open, onClose }: TaskDetailModalProps) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <DialogTitle className="text-xl font-semibold">{task.title}</DialogTitle>
              <div className="flex items-center gap-3 pt-1">
                <PriorityBadge priority={task.priority} />
                <StatusLabel status={task.status} />
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-4 space-y-6">
          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Assignee</span>
            </div>
            <div className="flex items-center gap-2">
              {task.assignee ? (
                <>
                  <UserAvatar name={task.assignee.name} avatar={task.assignee.avatar} size="sm" />
                  <span className="text-sm">{task.assignee.name}</span>
                </>
              ) : (
                <span className="text-muted-foreground">Unassigned</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Due date</span>
            </div>
            <div className="text-sm">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
                : "No due date"}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h4 className="text-sm font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {task.description || "No description added yet."}
            </p>
          </div>

          {/* Attachments placeholder */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <Paperclip className="h-3.5 w-3.5" />
              Attachments
            </h4>
            <p className="text-sm text-muted-foreground">No attachments yet.</p>
          </div>

          <Separator />

          {/* Comments */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5" />
              Comments
              {task.comments && <span className="text-muted-foreground">({task.comments.length})</span>}
            </h4>

            <div className="space-y-3">
              {task.comments?.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <UserAvatar name={comment.author.name} avatar={comment.author.avatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{comment.author.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Textarea placeholder="Write a comment..." className="resize-none" rows={2} />
              <div className="flex justify-end mt-2">
                <Button size="sm">Comment</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StatusLabel({ status }: { status: Task["status"] }) {
  const labels: Record<Task["status"], string> = {
    todo: "To Do",
    in_progress: "In Progress",
    done: "Done",
  };
  return (
    <span className="text-xs text-muted-foreground capitalize">{labels[status]}</span>
  );
}
