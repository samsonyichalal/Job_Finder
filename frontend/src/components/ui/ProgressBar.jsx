import React from "react";

export default function ProgressBar({ currentStep, totalSteps = 5 }) {
  const percentage = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full flex flex-col gap-2 mb-6">
      <div className="flex justify-between items-center text-xs font-semibold text-muted uppercase tracking-wider">
        <span>Progress</span>
        <span>Step {currentStep} of {totalSteps}</span>
      </div>
      <div className="w-full h-2.5 bg-background border border-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
