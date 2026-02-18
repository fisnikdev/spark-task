export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  assignee?: User;
  dueDate?: string;
  projectId: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  members: User[];
  taskCount: number;
}

export const users: User[] = [
  { id: "1", name: "Fisnik", email: "fisnik@demo.com", avatar: "F" },
  { id: "2", name: "Alex Chen", email: "alex@demo.com", avatar: "A" },
  { id: "3", name: "Sofia Rivera", email: "sofia@demo.com", avatar: "S" },
  { id: "4", name: "Marcus Webb", email: "marcus@demo.com", avatar: "M" },
];

export const currentUser = users[0];

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Website Redesign",
    description: "Complete overhaul of the marketing site with new brand guidelines",
    color: "hsl(239 84% 67%)",
    members: [users[0], users[1], users[2]],
    taskCount: 12,
  },
  {
    id: "proj-2",
    name: "Q2 Marketing Campaign",
    description: "Launch multi-channel campaign for Q2 product release",
    color: "hsl(142 71% 45%)",
    members: [users[0], users[3]],
    taskCount: 8,
  },
  {
    id: "proj-3",
    name: "Mobile App v1",
    description: "First version of the mobile companion app",
    color: "hsl(38 92% 50%)",
    members: [users[0], users[1], users[2], users[3]],
    taskCount: 24,
  },
];

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Design hero section",
    description: "Create a compelling hero section with clear value proposition and CTA",
    status: "in_progress",
    priority: "high",
    assignee: users[0],
    dueDate: "2026-02-19",
    projectId: "proj-1",
    comments: [
      { id: "c1", content: "I've shared some initial wireframes in Figma. Let me know your thoughts!", author: users[1], createdAt: "2026-02-17T10:30:00Z" },
      { id: "c2", content: "Looks great! I'd suggest making the CTA more prominent.", author: users[0], createdAt: "2026-02-17T11:15:00Z" },
    ],
  },
  {
    id: "task-2",
    title: "Write copy for landing page",
    description: "Draft compelling copy for all landing page sections",
    status: "todo",
    priority: "medium",
    assignee: users[2],
    dueDate: "2026-02-20",
    projectId: "proj-1",
  },
  {
    id: "task-3",
    title: "Review pull request #42",
    description: "Review and approve the authentication flow PR",
    status: "todo",
    priority: "urgent",
    assignee: users[0],
    dueDate: "2026-02-18",
    projectId: "proj-3",
  },
  {
    id: "task-4",
    title: "Set up email templates",
    description: "Design and implement transactional email templates",
    status: "todo",
    priority: "low",
    assignee: users[3],
    dueDate: "2026-02-22",
    projectId: "proj-2",
  },
  {
    id: "task-5",
    title: "Implement user onboarding flow",
    description: "Build the step-by-step onboarding experience for new users",
    status: "in_progress",
    priority: "high",
    assignee: users[1],
    dueDate: "2026-02-21",
    projectId: "proj-3",
  },
  {
    id: "task-6",
    title: "Fix navigation responsiveness",
    description: "Ensure navigation works perfectly on all screen sizes",
    status: "done",
    priority: "medium",
    assignee: users[0],
    projectId: "proj-1",
  },
  {
    id: "task-7",
    title: "Create social media assets",
    description: "Design banner images and post templates for Q2 campaign",
    status: "todo",
    priority: "medium",
    assignee: users[2],
    dueDate: "2026-02-25",
    projectId: "proj-2",
  },
  {
    id: "task-8",
    title: "API integration testing",
    description: "Write and run integration tests for all API endpoints",
    status: "in_progress",
    priority: "high",
    assignee: users[3],
    dueDate: "2026-02-19",
    projectId: "proj-3",
  },
  {
    id: "task-9",
    title: "Update brand color palette",
    description: "Refresh the color palette based on new brand guidelines",
    status: "done",
    priority: "low",
    assignee: users[2],
    projectId: "proj-1",
  },
  {
    id: "task-10",
    title: "Performance optimization",
    description: "Optimize bundle size and loading performance",
    status: "todo",
    priority: "high",
    assignee: users[1],
    dueDate: "2026-02-23",
    projectId: "proj-3",
  },
];

export const getTasksByProject = (projectId: string) =>
  tasks.filter((t) => t.projectId === projectId);

export const getTasksByStatus = (projectId: string, status: Task["status"]) =>
  tasks.filter((t) => t.projectId === projectId && t.status === status);

export const getTodayTasks = () =>
  tasks.filter((t) => t.assignee?.id === currentUser.id && t.status !== "done");

export const priorityColors: Record<Task["priority"], string> = {
  low: "text-muted-foreground bg-muted",
  medium: "text-warning-foreground bg-warning",
  high: "text-primary-foreground bg-primary",
  urgent: "text-destructive-foreground bg-destructive",
};
