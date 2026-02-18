import { Link, useLocation } from "react-router-dom";
import {
  Inbox,
  FolderKanban,
  Plus,
  Settings,
  User,
  Zap,
  ChevronLeft,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isProjectActive = (id: string) => location.pathname === `/projects/${id}`;

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-sidebar h-screen sticky top-0 transition-all duration-200 shrink-0",
        collapsed ? "w-14" : "w-60"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-3 border-b border-border">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-sm">
            <Zap className="h-4 w-4 text-primary" />
            Flowboard
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
        <SidebarLink to="/dashboard" icon={Inbox} label="Inbox" active={isActive("/dashboard")} collapsed={collapsed} />

        {!collapsed && (
          <div className="pt-4 pb-1 px-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Projects</span>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        {projects.map((project) => (
          <SidebarLink
            key={project.id}
            to={`/projects/${project.id}`}
            icon={Hash}
            label={project.name}
            active={isProjectActive(project.id)}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border py-2 px-2 space-y-1">
        <SidebarLink to="/dashboard" icon={Settings} label="Settings" active={false} collapsed={collapsed} />
        <SidebarLink to="/dashboard" icon={User} label="Profile" active={false} collapsed={collapsed} />
      </div>
    </aside>
  );
}

function SidebarLink({
  to,
  icon: Icon,
  label,
  active,
  collapsed,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}
