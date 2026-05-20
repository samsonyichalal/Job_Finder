import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function Button({ children, className, variant = "primary", size = "md", ...props }) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 hover:from-primary/95 hover:to-secondary/95 text-white border border-primary/20",
    ghost: "bg-transparent text-text border border-border hover:bg-card/50 hover:border-muted/30 hover:text-white",
    success: "bg-success text-white hover:bg-success/90",
    danger: "bg-danger text-white hover:bg-danger/90",
    link: "bg-transparent text-primary hover:underline p-0"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base"
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </button>
  );
}
