import React from "react";
import { AlertCircle, Info, ShieldAlert, TriangleAlert } from "lucide-react";
import Button from "./Button";

export default function StatusBanner({
  title,
  message,
  tone = "info",
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
}) {
  const toneMap = {
    info: {
      wrapper: "bg-indigo-500/10 border-indigo-500/20 text-indigo-200",
      icon: Info,
      iconColor: "text-indigo-400",
    },
    warning: {
      wrapper: "bg-amber-500/10 border-amber-500/20 text-amber-100",
      icon: TriangleAlert,
      iconColor: "text-amber-400",
    },
    danger: {
      wrapper: "bg-rose-500/10 border-rose-500/20 text-rose-100",
      icon: ShieldAlert,
      iconColor: "text-rose-400",
    },
    success: {
      wrapper: "bg-emerald-500/10 border-emerald-500/20 text-emerald-100",
      icon: AlertCircle,
      iconColor: "text-emerald-400",
    },
  };

  const style = toneMap[tone] || toneMap.info;
  const Icon = style.icon;

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 ${style.wrapper}`}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className={`w-10 h-10 rounded-xl bg-black/20 border border-white/10 flex items-center justify-center shrink-0 ${style.iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold tracking-wide uppercase">{title}</h3>
          <p className="text-sm leading-relaxed mt-1 text-current/90">{message}</p>
        </div>
        {(actionLabel || secondaryLabel) && (
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            {secondaryLabel && (
              <Button variant="ghost" size="sm" onClick={onSecondaryAction} className="whitespace-nowrap">
                {secondaryLabel}
              </Button>
            )}
            {actionLabel && (
              <Button variant="primary" size="sm" onClick={onAction} className="whitespace-nowrap">
                {actionLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
