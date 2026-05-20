import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function Card({ children, className, onClick, ...props }) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        clsx(
          "bg-card/75 backdrop-blur-md border border-border/80 rounded-xl p-6 shadow-xl transition-all duration-300",
          onClick && "hover:border-secondary/40 hover:bg-card hover:shadow-secondary/5 cursor-pointer hover:scale-[1.01]",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
