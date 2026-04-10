"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

const toastIcons = {
  error: AlertCircle,
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
};

const toastStyles = {
  error: "bg-red-500/10 border-red-500/30 text-red-400",
  success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  info: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  warning: "bg-amber-500/10 border-amber-500/30 text-amber-400",
};

const iconStyles = {
  error: "text-red-400",
  success: "text-emerald-400",
  info: "text-blue-400",
  warning: "text-amber-400",
};

export function ToastContainer() {
  const { toasts, removeToast } = useAppStore();

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => removeToast(toast.id), 5000)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => {
        const Icon = toastIcons[toast.type];
        return (
          <div
            key={toast.id}
            className={`
              flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm
              animate-in slide-in-from-right fade-in duration-300
              ${toastStyles[toast.type]}
            `}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconStyles[toast.type]}`} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-white">{toast.title}</p>
              <p className="text-sm text-zinc-400 mt-1">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
