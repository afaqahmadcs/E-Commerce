import { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "dark" | "outline" | "success";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}: BadgeProps) {
  const base = "inline-flex items-center font-mono uppercase font-semibold tracking-widest rounded";

  const sizes = {
    sm: "px-2 py-0.5 text-[9px]",
    md: "px-2.5 py-1 text-[10px]",
  };

  const variants = {
    default: "bg-brand-card text-brand-text border border-brand-border",
    accent: "bg-brand-accent text-white",
    dark: "bg-brand-dark text-white",
    outline: "bg-transparent border border-brand-border text-brand-muted",
    success: "bg-emerald-900/10 text-emerald-800 border border-emerald-900/20",
  };

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
