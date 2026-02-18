import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
};

const colorMap: Record<string, string> = {
  F: "bg-primary/20 text-primary",
  A: "bg-success/20 text-success",
  S: "bg-warning/20 text-warning",
  M: "bg-destructive/20 text-destructive",
};

export function UserAvatar({ name, avatar, size = "md", className }: UserAvatarProps) {
  const initial = avatar || name.charAt(0).toUpperCase();
  const color = colorMap[initial] || "bg-muted text-muted-foreground";

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-semibold shrink-0",
        sizeClasses[size],
        color,
        className
      )}
      title={name}
    >
      {initial}
    </div>
  );
}
