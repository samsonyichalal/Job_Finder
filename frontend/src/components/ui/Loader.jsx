import React from "react";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function Loader({ size = "md", className, variant = "spinner" }) {
  if (variant === "skeleton") {
    return (
      <div className={twMerge(clsx("animate-pulse flex flex-col gap-3 w-full", className))}>
        <div className="h-6 bg-border rounded-md w-1/3" />
        <div className="h-4 bg-border/60 rounded-md w-full" />
        <div className="h-4 bg-border/40 rounded-md w-5/6" />
      </div>
    );
  }

  if (variant === "card-skeleton") {
    return (
      <div className={twMerge(clsx("bg-card/40 border border-border/40 rounded-xl p-6 animate-pulse flex flex-col gap-4 w-full", className))}>
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-border rounded-lg" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-5 bg-border rounded w-1/2" />
            <div className="h-4 bg-border/60 rounded w-1/4" />
          </div>
        </div>
        <div className="h-4 bg-border/40 rounded w-full" />
        <div className="h-4 bg-border/20 rounded w-3/4" />
        <div className="flex gap-2 mt-2">
          <div className="w-16 h-6 bg-border/50 rounded-full" />
          <div className="w-20 h-6 bg-border/50 rounded-full" />
        </div>
      </div>
    );
  }

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={twMerge(clsx("flex justify-center items-center py-8", className))}>
      <Loader2 className={clsx("animate-spin text-secondary", sizeClasses[size])} />
    </div>
  );
}
