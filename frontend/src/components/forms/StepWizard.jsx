import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import Button from "../ui/Button";

export default function StepWizard({ 
  steps = [], 
  currentStep = 0, 
  onNext, 
  onPrev, 
  isNextDisabled = false,
  isPrevDisabled = false,
  nextLabel = "Continue",
  prevLabel = "Back",
  children 
}) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Horizontal Stepper Progress Indicator */}
      <div className="flex items-center justify-between px-2">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;

          return (
            <React.Fragment key={idx}>
              {/* Stepper Circle */}
              <div className="flex flex-col items-center relative group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border font-bold text-xs transition-all duration-300 ${
                  isCompleted 
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                    : isActive 
                      ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-500/10" 
                      : "bg-slate-950 border-slate-800 text-slate-500"
                }`}>
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-extrabold mt-2 absolute -bottom-6 w-24 text-center ${
                  isActive ? "text-indigo-400" : isCompleted ? "text-emerald-400" : "text-slate-500"
                }`}>
                  {step}
                </span>
              </div>

              {/* Connector line between steps */}
              {idx < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 bg-slate-800 relative -top-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500" 
                    style={{ width: isCompleted ? "100%" : "0%" }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Content wrapper with smooth slide animation */}
      <div className="bg-slate-900/10 border border-slate-800/80 rounded-2xl p-6 md:p-8 relative overflow-hidden mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[300px]"
          >
            {children}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Action Buttons */}
        <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-800/80">
          <Button
            variant="ghost"
            onClick={onPrev}
            disabled={isPrevDisabled}
            className={`text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 hover:bg-transparent ${
              isPrevDisabled ? "opacity-0 cursor-default" : ""
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-indigo-400" />
            {prevLabel}
          </Button>

          <Button
            variant="primary"
            onClick={onNext}
            disabled={isNextDisabled}
            className="text-xs font-bold px-6 py-2.5 shadow-md shadow-indigo-600/15 flex items-center gap-1"
          >
            {nextLabel}
            {currentStep < steps.length - 1 && (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
