import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function Input({ label, error, className, id, type = "text", ...props }) {
  return (
    <div className="w-full flex flex-col gap-1.5 mb-4">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={twMerge(
          clsx(
            "bg-background border border-border/80 rounded-lg px-4 py-2.5 text-text focus:outline-none focus:border-secondary transition-colors duration-300 w-full placeholder:text-muted/50 text-sm",
            error && "border-danger focus:border-danger"
          ),
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-danger font-medium mt-0.5">{error}</span>}
    </div>
  );
}
