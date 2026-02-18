import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, ArrowRight, FolderKanban, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/TaskCard";
import { TaskDetailModal } from "@/components/TaskDetailModal";
import { UserAvatar } from "@/components/UserAvatar";
import { currentUser, getTodayTasks, projects, type Task } from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function Dashboard() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const todayTasks = getTodayTasks();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="max-w-4xl space-y-8">
      {/* Welcome */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {greeting}, {currentUser.name}
        </h1>
        <p className="text-muted-foreground mt-1">
          You have {todayTasks.length} tasks to focus on today.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
      >
        <StatCard icon={CheckCircle2} label="Tasks due today" value={todayTasks.filter((t) => t.dueDate === "2026-02-18").length.toString()} />
        <StatCard icon={Clock} label="In progress" value={todayTasks.filter((t) => t.status === "in_progress").length.toString()} />
        <StatCard icon={FolderKanban} label="Active projects" value={projects.length.toString()} />
      </motion.div>

      {/* My Tasks Today */}
      <motion.section initial="hidden" animate="visible" variants={fadeUp} custom={2}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">My tasks</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Plus className="h-4 w-4 mr-1" /> Add task
          </Button>
        </div>
        <div className="space-y-2">
          {todayTasks.map((task) => (
            <TaskCard key={task.id} task={task} variant="row" onClick={() => setSelectedTask(task)} />
          ))}
        </div>
      </motion.section>

      {/* Recent Projects */}
      <motion.section initial="hidden" animate="visible" variants={fadeUp} custom={3}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Recent projects</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: project.color }} />
                <h3 className="font-medium text-sm">{project.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{project.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-1.5">
                  {project.members.slice(0, 3).map((m) => (
                    <UserAvatar key={m.id} name={m.name} avatar={m.avatar} size="sm" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{project.taskCount} tasks</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      <TaskDetailModal task={selectedTask} open={!!selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        <Icon className="h-4 w-4" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
