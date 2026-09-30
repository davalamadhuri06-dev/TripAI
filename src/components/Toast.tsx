import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'warning';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success' || !toast.type;
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-200 ${
              isSuccess
                ? 'border-emerald-500/40 bg-slate-900/95 text-emerald-200 shadow-emerald-950/40'
                : isWarning
                ? 'border-amber-500/40 bg-slate-900/95 text-amber-200 shadow-amber-950/40'
                : 'border-cyan-500/40 bg-slate-900/95 text-cyan-200 shadow-cyan-950/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isSuccess && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
              {isWarning && <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />}
              {!isSuccess && !isWarning && <Info className="h-4 w-4 text-cyan-400 shrink-0" />}
              <span className="text-xs font-medium leading-snug">{toast.text}</span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="rounded-lg p-1 text-slate-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
