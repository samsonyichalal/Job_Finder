import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { COLOR_MAP } from "../../utils/constants";

export default function Badge({ children, className, variant = "info", ...props }) {
  // Check if variant corresponds to High, Medium, Low for custom styles
  const isMatchLabel = ["High", "Medium", "Low"].includes(children);
  const matchedStyle = isMatchLabel ? COLOR_MAP[children] : "";

  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none border";
  
  const variants = {
    primary: "bg-primary/20 text-primary border-primary/30",
    secondary: "bg-secondary/20 text-secondary border-secondary/30",
    success: "bg-success/20 text-success border-success/30",
    warning: "bg-warning/20 text-warning border-warning/30",
    danger: "bg-danger/20 text-danger border-danger/30",
    info: "bg-card text-muted border-border"
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, matchedStyle || variants[variant], className))}
      {...props}
    >
      {children}
    </span>
  );
}
